import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PublicSite from "./pages/publicUser/PublicSite";
import "./index.css";
import "./App.css"
import { extractSubdomain } from "./utils/utils";
import { ThemeProvider } from "./components/usecontext.jsx";

function WebsiteRoot() {
    // const subdomain = extractSubdomain(); // use this for custom-domain in production later

    // use this to simulate subdomain like behavour through path based url
    const url = window.location.href;
    const segments = url.split('/');
    const subdomain = segments[segments.length - 1];

    return <PublicSite subdomain={subdomain} />;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <WebsiteRoot />
        </ThemeProvider>
    </StrictMode>
);