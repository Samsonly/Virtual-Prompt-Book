"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CreateNewProject_1 = __importDefault(require("./CreateNewProject"));
const OpenProject_1 = __importDefault(require("./OpenProject"));
const ProjectContext_1 = require("../contexts/ProjectContext");
const GlobalContext_1 = require("../contexts/GlobalContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const RehearsalNotes_1 = __importDefault(require("./RehearsalNotes"));
const NavigationBar_1 = __importDefault(require("./NavigationBar"));
const GadgetBar_1 = __importDefault(require("./GadgetBar"));
const ContentContainer_1 = __importDefault(require("./ContentContainer"));
const StatusBar_1 = __importDefault(require("./StatusBar"));
require("../styles/ProjectWindow.css");
const UploadScript_1 = __importDefault(require("./UploadScript"));
const CharacterList_1 = __importDefault(require("./CharacterList"));
const ContactDatabase_1 = __importDefault(require("./ContactDatabase"));
const ProductionTeam_1 = __importDefault(require("./ProductionTeam"));
const CastList_1 = __importDefault(require("./CastList"));
const EndRehearsal_1 = __importDefault(require("./EndRehearsal"));
const ViewLineNotes_1 = __importDefault(require("./ViewLineNotes"));
const { ipcRenderer } = window.require("electron");
const ProjectWindow = () => {
    const { state: projectState } = (0, ProjectContext_1.useProject)();
    const { state: globalState } = (0, GlobalContext_1.useGlobal)();
    const { showSettings, hideSettings } = (0, SettingsContext_1.useSettings)();
    const { loadingType } = globalState;
    (0, react_1.useEffect)(() => {
        const handleKeydown = (e) => {
            const isCmdOrCtrl = e.metaKey || e.ctrlKey;
            if (isCmdOrCtrl && e.key.toLowerCase() === "n") {
                e.preventDefault();
                showSettings(RehearsalNotes_1.default, {});
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [showSettings]);
    (0, react_1.useEffect)(() => {
        const listener = (event, itemName) => {
            switch (itemName) {
                // Project menu
                case "New Project":
                    showSettings(CreateNewProject_1.default);
                    break;
                case "Open Project":
                    showSettings(OpenProject_1.default);
                    break;
                case "Save Project":
                    // Implement save logic here
                    break;
                // Content menu
                case "Upload Script":
                    showSettings(UploadScript_1.default);
                    break;
                case "Character List":
                    showSettings(CharacterList_1.default);
                    break;
                // Team menu
                case "Contact List":
                    showSettings(ContactDatabase_1.default);
                    break;
                case "Production Team":
                    showSettings(ProductionTeam_1.default);
                    break;
                case "Cast List":
                    showSettings(CastList_1.default);
                    break;
                // Rehearsal menu
                case "End Rehearsal":
                    showSettings(EndRehearsal_1.default);
                    break;
                // Reports menu
                case "View Line Notes":
                    showSettings(ViewLineNotes_1.default);
                    break;
                default:
                    break;
            }
        };
        ipcRenderer.on("menu-item-click", listener);
        // Clean up the event listener on unmount
        return () => {
            ipcRenderer.removeListener("menu-item-click", listener);
        };
    }, [showSettings]);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "project-window" }, { children: [(0, jsx_runtime_1.jsx)(NavigationBar_1.default, {}), (0, jsx_runtime_1.jsx)(GadgetBar_1.default, {}), (0, jsx_runtime_1.jsx)(ContentContainer_1.default, {}), (0, jsx_runtime_1.jsx)(StatusBar_1.default, {}), loadingType === "new" && (0, jsx_runtime_1.jsx)(CreateNewProject_1.default, {}), loadingType === "open" && (0, jsx_runtime_1.jsx)(OpenProject_1.default, {})] })));
};
exports.default = ProjectWindow;
