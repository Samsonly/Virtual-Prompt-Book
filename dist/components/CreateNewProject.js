"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ProjectContext_1 = require("../contexts/ProjectContext");
const GlobalContext_1 = require("../contexts/GlobalContext");
require("../styles/CreateNewProject.css");
const CreateNewProject = () => {
    const [projectName, setProjectName] = (0, react_1.useState)("");
    const { dispatch: projectDispatch } = (0, ProjectContext_1.useProject)();
    const { dispatch: globalDispatch } = (0, GlobalContext_1.useGlobal)();
    const inputRef = (0, react_1.useRef)(null);
    // Focus on the input field after the component mounts
    (0, react_1.useEffect)(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    const handleCreateProject = () => {
        if (!projectName) {
            alert("Please enter a project name.");
            return;
        }
        projectDispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { projectName },
        });
        projectDispatch({ type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS, payload: false });
        globalDispatch({ type: GlobalContext_1.SET_LOADING_TYPE, payload: "" });
    };
    const clearProject = () => {
        globalDispatch({ type: GlobalContext_1.UPDATE_PROJECT_ACTIVE_STATUS, payload: false });
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleCreateProject();
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "new-project-modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "new-project-modal-window" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "new-project-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "new-project-title" }, { children: "Create New Project" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "new-project-name-form" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "new-project-name" }, { children: "Project Name:" })), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "new-project-name", value: projectName, onChange: (e) => setProjectName(e.target.value), onKeyDown: handleKeyPress, placeholder: "Enter project name", ref: inputRef })] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "create-new-project-close-button", onClick: clearProject }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "create-new-project-button", onClick: handleCreateProject }, { children: "Create Project" }))] })) })));
};
exports.default = CreateNewProject;
