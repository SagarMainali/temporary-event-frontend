
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// this below import from useContex
import { ThemeProvider } from "./components/usecontext.jsx";
import { LoginProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </ThemeProvider>
  </StrictMode>
);

