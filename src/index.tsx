import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/fonts.css";
import App from "./App";
import { GlobalProvider } from "./contexts/GlobalContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
}
