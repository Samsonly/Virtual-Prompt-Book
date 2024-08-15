"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
require("./index.css");
require("./styles/fonts.css");
const App_1 = __importDefault(require("./App"));
const GlobalContext_1 = require("./contexts/GlobalContext");
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = (0, client_1.createRoot)(rootElement);
    root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(GlobalContext_1.GlobalProvider, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }));
}
