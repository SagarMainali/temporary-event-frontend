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
import { Loader2 } from 'lucide-react';
import Profile from './pages/user/Profile';
import TemplatePreviewer from './pages/user/TemplatePreviewer';
import WebsiteEditor from './pages/user/WebsiteEditor';
import ViewWebsite from './pages/website/ViewWebsite';

function App() {
  const { loading, isLoggedIn } = useLogin();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-600" size={40} />
      </div>
    );
  }

  const { appMode, websiteId } = getQueryParams();
  if (appMode === 'website' && websiteId) {
    console.log("🚀 ~ App ~ appMode:", appMode)
    console.log("🚀 ~ App ~ websiteId:", websiteId)
    return <ViewWebsite websiteId={websiteId} />
  }

  // Main domain (for organizers)
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
            <Route path="/dashboard" element={<h3>*Dashboard Contents*</h3>} />

            <Route path="/events" element={<ManageEvents />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/select-website-template" element={<TemplateSelector />} />
            <Route path="/events/:eventId/edit-website/:websiteId" element={<WebsiteEditor />} />
            
            <Route path="/websites" element={<ManageWebsites />} />
            <Route path="/emails" element={<h3>*TO TRACK EMAILS HERE*</h3>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<h3>*TO HANDLE SETTINGS HERE*</h3>} />
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
          duration: 1500,
        }}
      />
    </>
  );
}

export default App;
