
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React, { Suspense } from "react";
import { LoginProvider } from "./context/authContext.jsx";

// const CMS = React.lazy(() => import("./App.jsx"));
// const Website = React.lazy(() => import("./pages/publicUser/PublicSite.jsx"))

import CMS from "./App";
import Website from "./pages/publicUser/PublicSite";
// this below import from useContex
import { ThemeProvider } from "./components/usecontext.jsx";
import { extractSubdomain } from "./utils/utils.js";

const subdomain = extractSubdomain();
console.log("🚀 ~ subdomain:", subdomain)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
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