"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GlobalContext_1 = require("./contexts/GlobalContext");
const ProjectContext_1 = require("./contexts/ProjectContext");
const WelcomeScreen_1 = __importDefault(require("./components/WelcomeScreen"));
const ActiveProject_1 = __importDefault(require("./components/ActiveProject"));
const { ipcRenderer } = window.require("electron");
function App() {
    const { state: globalState } = (0, GlobalContext_1.useGlobal)();
    const { isProjectActive } = globalState;
    (0, react_1.useEffect)(() => {
        ipcRenderer.on("menu-item-click", (event, itemName) => {
            switch (itemName) {
                case "New Project":
                    // Handle this within App itself or delegate to GlobalContext
                    // handleNewProjectClick logic can go here or call a function within a GlobalContext
                    break;
                // Handle any other global actions here...
                default:
                    break;
            }
        });
        return () => {
            ipcRenderer.removeAllListeners("menu-item-click");
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "App" }, { children: !isProjectActive ? ((0, jsx_runtime_1.jsx)(WelcomeScreen_1.default, {})) : ((0, jsx_runtime_1.jsx)(ProjectContext_1.ProjectProvider, { children: (0, jsx_runtime_1.jsx)(ActiveProject_1.default, {}) })) })));
}
exports.default = App;
