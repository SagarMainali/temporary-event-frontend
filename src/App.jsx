import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/user/layout/DashboardLayout";
import { getQueryParams } from './utils/utils'
import ManageEvents from "@/pages/user/ManageEvents";
import ManageWebsites from "@/pages/user/ManageWebsites";
import TemplateSelector from "./pages/user/TemplateSelector";
import EventDetail from "./pages/user/EventDetail";
import { useLogin } from "./context/authContext";
import { Toaster } from "sonner";
import Profile from './pages/user/Profile';
import TemplatePreviewer from './pages/user/TemplatePreviewer';
import WebsiteEditor from './pages/user/WebsiteEditor';
import ViewWebsite from './pages/website/ViewWebsite';
import Leads from "./pages/user/Leads";
import ServerWakeupLoader from "./pages/user/components/ServerWakeupLoader";
import ManageTemplates from "./pages/user/ManageTemplates";

function App() {
  const { loading, isLoggedIn } = useLogin();

  if (loading) {
    return <ServerWakeupLoader />
  }

  // unplished website preview (opened from website editor when the site hasn't been published yet and doesn't have a subdomain yet)
  const { appMode, websiteId } = getQueryParams();
  if (appMode === 'website' && websiteId) {
    console.log("💻 ~ App ~ appMode:", appMode)
    console.log("💻 ~ App ~ websiteId:", websiteId)
    return <ViewWebsite websiteId={websiteId} />
  }

  // Main domain/CMS (for organizers)
  return (
    <>
      <Router>
        <Routes>
          {/* Root Route ("/") - Redirect to login or dashboard */}
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route path="/preview-template/:templateId/" element={!isLoggedIn ? <Navigate to="/login" /> : <TemplatePreviewer />} />

          {/* Protected Routes */}
          <Route
            element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route path="/dashboard" element={<h3>*DASHBOARD*</h3>} />

            <Route path="/events" element={<ManageEvents />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/select-website-template" element={<TemplateSelector />} />
            <Route path="/events/:eventId/edit-website/:websiteId" element={<WebsiteEditor />} />

            <Route path="/websites" element={<ManageWebsites />} />
            <Route path="/templates" element={<ManageTemplates />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<h3>*TO HANDLE SETTINGS*</h3>} />
          </Route>

          {/* Catch-all Route for any invalid path */}
          <Route
            path="*"
            element={<h3>Page doesn't exist.</h3>}
          />
        </Routes>
      </Router>
      <Toaster
        theme="dark" // light, dark or system
        toastOptions={{
          className: "bg-background text-foreground border border-border shadow-lg rounded-md",
          duration: 3500,
        }}
      />
    </>
  );
}

export default App;
