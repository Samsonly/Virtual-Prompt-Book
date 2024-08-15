"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const GlobalContext_1 = require("./contexts/GlobalContext"); // Adjust path as necessary
const ProjectContext_1 = require("./contexts/ProjectContext"); // Adjust path as necessary
const WelcomeScreen_1 = __importDefault(require("./components/WelcomeScreen"));
const ActiveProject_1 = __importDefault(require("./components/ActiveProject"));
// Define the types for your state
// interface GlobalState {
//   isProjectActive: boolean;
// }
// Dummy state for demonstration purposes
function App() {
    const { state } = (0, GlobalContext_1.useGlobal)();
    const { isProjectActive } = state;
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "App" }, { children: !isProjectActive ? ((0, jsx_runtime_1.jsx)(WelcomeScreen_1.default, {})) : ((0, jsx_runtime_1.jsx)(ProjectContext_1.ProjectProvider, { children: (0, jsx_runtime_1.jsx)(ActiveProject_1.default, {}) })) })));
}
exports.default = App;
