
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './App.css'
import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginProvider } from "./context/authContext.jsx";
import { ThemeProvider } from "./components/usecontext.jsx";
import { extractSubdomain } from "./utils/utils.js";

const CMS = React.lazy(() => import("./App.jsx"));
const Website = React.lazy(() => import("./pages/publicUser/PublicSite.jsx"))

const subdomain = extractSubdomain();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen" >
          <Loader2 className="animate-spin text-gray-600" size={40} />
        </div>
      }
      >
        {subdomain ? (
          <Website subdomain={subdomain} />
        ) : (
          <LoginProvider>
            <CMS />
          </LoginProvider>
        )}
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);