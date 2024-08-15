"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const App = () => {
    return (0, jsx_runtime_1.jsx)("h1", { children: "Hello, Electron!" });
};
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = (0, client_1.createRoot)(rootElement);
    root.render((0, jsx_runtime_1.jsx)(App, {}));
}
