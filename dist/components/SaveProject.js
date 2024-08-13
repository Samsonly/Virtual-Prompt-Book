"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SaveProject = () => {
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const { state } = (0, ProjectContext_1.useProject)();
    const handleSave = () => {
        const { projectSaveFile } = state;
        if (!projectSaveFile) {
            alert("No project data to save.");
            return;
        }
        const data = JSON.stringify(projectSaveFile, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const anchor = document.createElement("a");
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = "sm-project-file.thtr";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        hideSettings();
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-window" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "save-project-title" }, { children: "Save Project" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "save-project-button-container" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "save-project-button", onClick: handleSave }, { children: "Save" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "cancel-project-button", onClick: hideSettings }, { children: "Cancel" }))] }))] })) })));
};
exports.default = SaveProject;
