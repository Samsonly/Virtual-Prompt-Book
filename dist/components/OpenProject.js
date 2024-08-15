"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/OpenProject.css");
const ProjectContext_1 = require("../contexts/ProjectContext");
const GlobalContext_1 = require("../contexts/GlobalContext");
const OpenProject = () => {
    const { dispatch: dispatchGlobal } = (0, GlobalContext_1.useGlobal)();
    const { dispatch: dispatchProject } = (0, ProjectContext_1.useProject)();
    const handleFileChange = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                try {
                    const projectData = JSON.parse((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    dispatchProject({
                        type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
                        payload: projectData,
                    });
                    dispatchProject({ type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS, payload: false });
                    dispatchGlobal({ type: GlobalContext_1.SET_LOADING_TYPE, payload: "" });
                }
                catch (error) {
                    console.error("Error parsing project file:", error);
                }
            };
            reader.readAsText(file);
        }
    };
    const openProject = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".thtr";
        fileInput.style.display = "none";
        fileInput.onchange = handleFileChange;
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    };
    const clearProject = () => {
        dispatchGlobal({ type: GlobalContext_1.UPDATE_PROJECT_ACTIVE_STATUS, payload: false });
        dispatchGlobal({ type: GlobalContext_1.SET_LOADING_TYPE, payload: "" });
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "open-project-modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "open-project-modal-window" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "open-project-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "open-project-title" }, { children: "Open Project" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "open-project-filetype" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ id: "open-project-file-button", onClick: openProject }, { children: "Open Project File" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "open-project-folder-button", onClick: openProject }, { children: "Open Project Folder" }))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "open-project-close-button", onClick: clearProject }, { children: "Close" }))] })) })));
};
exports.default = OpenProject;
