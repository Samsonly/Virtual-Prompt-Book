"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SettingsContext_1 = require("../contexts/SettingsContext");
const GlobalContext_1 = require("../contexts/GlobalContext");
const ProjectContext_1 = require("../contexts/ProjectContext");
const CharacterList_1 = __importDefault(require("./CharacterList"));
const ContactDatabase_1 = __importDefault(require("./ContactDatabase"));
const CustomConfirm_1 = __importDefault(require("../containers/CustomConfirm"));
const EndRehearsal_1 = __importDefault(require("./EndRehearsal"));
const OpenProject_1 = __importDefault(require("./OpenProject"));
const CastList_1 = __importDefault(require("./CastList"));
const ProductionTeam_1 = __importDefault(require("./ProductionTeam"));
const UploadScript_1 = __importDefault(require("./UploadScript"));
const ViewLineNotes_1 = __importDefault(require("./ViewLineNotes"));
const saveProjectUtil_1 = require("../utils/saveProjectUtil");
require("../styles/NavigationBar.css");
function NavigationBar() {
    const [activeDropdown, setActiveDropdown] = (0, react_1.useState)(null);
    const { showSettings, hideSettings } = (0, SettingsContext_1.useSettings)();
    const { dispatch: dispatchGlobal } = (0, GlobalContext_1.useGlobal)();
    const { state: projectState } = (0, ProjectContext_1.useProject)();
    const { isProjectSaved, projectSaveFile } = projectState;
    const handleDropdown = (itemId) => {
        setActiveDropdown(itemId);
    };
    const handleNewProjectProcess = () => {
        dispatchGlobal({ type: GlobalContext_1.UPDATE_PROJECT_ACTIVE_STATUS, payload: false });
        setTimeout(() => {
            dispatchGlobal({ type: GlobalContext_1.UPDATE_PROJECT_ACTIVE_STATUS, payload: true });
        }, 100);
    };
    const handleNewProjectClick = (callback) => {
        const confirmAndSave = (retry = false) => {
            const message = retry
                ? `Failed to save ${projectSaveFile.projectName}. Try again?`
                : `You have unsaved changes in ${projectSaveFile.projectName}. Do you want to save before creating a new project?`;
            showSettings(CustomConfirm_1.default, {
                message,
                onNo: () => {
                    hideSettings();
                    if (!retry) {
                        callback();
                    }
                },
                onYes: () => {
                    (0, saveProjectUtil_1.saveProjectData)(projectState.projectSaveFile)
                        .then(() => {
                        hideSettings();
                        callback();
                    })
                        .catch((error) => {
                        console.error("Error saving the project:", error);
                        confirmAndSave(true);
                    });
                },
            });
        };
        if (!isProjectSaved) {
            confirmAndSave();
        }
        else {
            callback();
        }
    };
    const handleItemClick = (e, item) => {
        e.stopPropagation();
        setActiveDropdown(null);
        switch (item) {
            case "Character List":
                showSettings(CharacterList_1.default);
                break;
            case "Contact List":
                showSettings(ContactDatabase_1.default);
                break;
            case "End Rehearsal":
                showSettings(EndRehearsal_1.default);
                break;
            case "New Project":
                handleNewProjectClick(handleNewProjectProcess);
                break;
            case "Open Project":
                showSettings(OpenProject_1.default);
                break;
            case "Cast List":
                showSettings(CastList_1.default);
                break;
            case "Production Team":
                showSettings(ProductionTeam_1.default);
                break;
            case "Save Project":
                (0, saveProjectUtil_1.saveProjectData)(projectState.projectSaveFile);
                break;
            case "Upload Script":
                showSettings(UploadScript_1.default);
                break;
            case "View Line Notes":
                showSettings(ViewLineNotes_1.default);
                break;
            default:
                break;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "nav-bar" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-1", onClick: () => handleDropdown(1), onMouseOver: () => activeDropdown && handleDropdown(1) }, { children: ["Project", activeDropdown === 1 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item1", onClick: (e) => handleItemClick(e, "New Project") }, { children: "New Project" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item2", onClick: (e) => handleItemClick(e, "Open Project") }, { children: "Open Project" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item3", onClick: (e) => handleItemClick(e, "Save Project") }, { children: "Save Project" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item4" }, { children: "Save Project As" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item5" }, { children: "Placeholder 5" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd1item10" }, { children: "Placeholder 10" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-2", onClick: () => handleDropdown(2), onMouseOver: () => activeDropdown && handleDropdown(2) }, { children: ["Content", activeDropdown === 2 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item1", onClick: (e) => handleItemClick(e, "Upload Script") }, { children: "Upload Script" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item2" }, { children: "Edit Script" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item3" }, { children: "Placeholder 3" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item4" }, { children: "Placeholder 4" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item5", onClick: (e) => handleItemClick(e, "Character List") }, { children: "Character List" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd2item10" }, { children: "Placeholder 10" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-3", onClick: () => handleDropdown(3), onMouseOver: () => activeDropdown && handleDropdown(3) }, { children: ["Team", activeDropdown === 3 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item1", onClick: (e) => handleItemClick(e, "Contact List") }, { children: "Contact List" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item3", onClick: (e) => handleItemClick(e, "Production Team") }, { children: "Production Team" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item2", onClick: (e) => handleItemClick(e, "Cast List") }, { children: "Cast List" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item4" }, { children: "Placeholder 4" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item5" }, { children: "Placeholder 5" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd3item10" }, { children: "Settings" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-4", onClick: () => handleDropdown(4), onMouseOver: () => activeDropdown && handleDropdown(4) }, { children: ["Rehearsal", activeDropdown === 4 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item1" }, { children: "Placeholder 1" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item2" }, { children: "Placeholder 2" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item3" }, { children: "Placeholder 3" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item4" }, { children: "Placeholder 4" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item5" }, { children: "Placeholder 5" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd4item10", onClick: (e) => handleItemClick(e, "End Rehearsal") }, { children: "End Rehearsal" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-5", onClick: () => handleDropdown(5), onMouseOver: () => activeDropdown && handleDropdown(5) }, { children: ["Schedule", activeDropdown === 5 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item1" }, { children: "Placeholder 1" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item2" }, { children: "Placeholder 2" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item3" }, { children: "Placeholder 3" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item4" }, { children: "Placeholder 4" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item5" }, { children: "Placeholder 5" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd5item10" }, { children: "Placeholder 10" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-6", onClick: () => handleDropdown(6), onMouseOver: () => activeDropdown && handleDropdown(6) }, { children: ["Reports", activeDropdown === 6 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item1", onClick: (e) => handleItemClick(e, "View Line Notes") }, { children: "Line Notes" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item2" }, { children: "Rehearsal Reports" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item3" }, { children: "Performance Reports" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item4" }, { children: "Production Meeting Notes" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item5" }, { children: "Tech Week Notes" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item6" }, { children: "Daily Call" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd6item10" }, { children: "[Equity]" }))] })))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav-bar-item", id: "nb-item-7", onClick: () => handleDropdown(7), onMouseOver: () => activeDropdown && handleDropdown(7) }, { children: ["Help", activeDropdown === 7 && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dropdown-content" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item1" }, { children: "Placeholder 1" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item2" }, { children: "Placeholder 2" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item3" }, { children: "Placeholder 3" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item4" }, { children: "Placeholder 4" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item5" }, { children: "Placeholder 5" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item6" }, { children: "Placeholder 6" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item7" }, { children: "Placeholder 7" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item8" }, { children: "Placeholder 8" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item9" }, { children: "Placeholder 9" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dditem", id: "dd7item10" }, { children: "Placeholder 10" }))] })))] }))] })));
}
exports.default = NavigationBar;
