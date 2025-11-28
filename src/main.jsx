
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './App.css'
import React, { Suspense } from "react";
import { LoginProvider } from "./context/authContext.jsx";
import { ThemeProvider } from "./components/usecontext.jsx";
import { extractSubdomain } from "./utils/utils.js";
import PrimaryLoader from "./components/loaders/PrimaryLoader";

const CMS = React.lazy(() => import("./App.jsx"));
const Website = React.lazy(() => import("./pages/publicUser/PublicSite.jsx"))

const subdomain = extractSubdomain();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ThemeProvider>
      <Suspense fallback={
        <PrimaryLoader />
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
  // </StrictMode>
);