import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/user/DashboardLayout";
import PublicSite from "./pages/publicUser/PublicSite";
import { extractSubdomain } from './utils/utils'

import './App.css'
import { useLogin } from "./context/authContext";

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
    <Router>
      <Routes>
        {/* Root Route ("/") - Redirect to login or dashboard */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/dashboard/" : "/login"} />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard/" /> : <Login />}
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        />

        {/* Catch-all Route for any invalid path */}
        <Route
          path="*"
          element={<h3>Page doesn't exist.</h3>}
        />
      </Routes>
    </Router>
  );
}

export default App;
