"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/EndRehearsal.css");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const EndRehearsal = () => {
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const [lineNotesReport, setLineNotesReport] = (0, react_1.useState)(false);
    const sendEndOfRehearsalReports = () => {
        //consider adding logic here that maintains if a rehearsal is active or not
        hideSettings();
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "end-rehearsal-modal-window" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "end-rehearsal-title" }, { children: "End of Rehearsal Reports" })), (0, jsx_runtime_1.jsx)("div", { id: "end-rehearsal-table" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "end-rehearsal-line-notes-row" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "line-notes-report", name: "line-notes-report", checked: lineNotesReport, onChange: () => setLineNotesReport(!lineNotesReport), className: "custom-checkbox" }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "line-notes-report" }, { children: "Line Notes" }))] }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "end-rehearsal-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-save-button", onClick: sendEndOfRehearsalReports }, { children: "Send Reports" }))] }))] })) })));
};
exports.default = EndRehearsal;
