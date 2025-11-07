import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PublicSite from "./pages/publicUser/PublicSite";
import "./index.css";
import "./App.css"
import { extractSubdomain } from "./utils/utils";
import { ThemeProvider } from "./components/usecontext.jsx";

function WebsiteRoot() {
    const subdomain = extractSubdomain();
    return <PublicSite subdomain={subdomain} />;
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <WebsiteRoot />
        </ThemeProvider>
    </StrictMode>
);