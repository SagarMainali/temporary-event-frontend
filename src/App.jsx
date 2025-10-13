import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/user/layout/DashboardLayout";
import PublicSite from "./pages/publicUser/PublicSite";
import { extractSubdomain } from './utils/utils'
import ManageEvents from "@/pages/user/ManageEvents";
import ManageWebsites from "@/pages/user/ManageWebsites";
import TemplateSelector from "./pages/user/TemplateSelector";
import EventDetail from "./pages/user/EventDetail";
import { useLogin } from "./context/authContext";
import { Toaster } from "sonner";
import PhotographyClass from './templates/photographyClass/PhotographyClass';


function App() {
  const subdomain = extractSubdomain();

  console.log("🚀 ~ App ~ subdomain:", subdomain)

  const { isLoggedIn } = useLogin();

  if (subdomain) {
    // Public-site (for visitors)
    return <PublicSite subdomain={subdomain} />;
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

          <Route path="/preview-template/:templateId/" element={isLoggedIn ? <PhotographyClass /> : <Login />} />

          {/* Protected Routes */}
          <Route
            element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route path="/dashboard" element={<h3>*Dashboard Contents*</h3>} />
            <Route path="/events" element={<ManageEvents />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/create-website/select-template" element={<TemplateSelector />} />
            <Route path="/events/:eventId/create-website/edit-template/:templateId" element={<PhotographyClass />} />
            <Route path="/websites" element={<ManageWebsites />} />
            <Route path="/emails" element={<h3>*TO TRACK EMAILS HERE*</h3>} />
            <Route path="/profile" element={<h3>*TO MANAGE PROFILE HERE*</h3>} />
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
