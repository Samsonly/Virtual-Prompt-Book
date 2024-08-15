"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProjectContext_1 = require("../contexts/ProjectContext");
require("../styles/RehearsalNotes.css");
const RehearsalNotes = () => {
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const [notesState, setNotesState] = (0, react_1.useState)({});
    const [textInput, setTextInput] = (0, react_1.useState)("");
    // Initialize state for each department dynamically, including "general"
    (0, react_1.useEffect)(() => {
        const initialState = Object.assign({ general: false }, projectSaveFile.productionDepartments.reduce((acc, department) => {
            acc[department] = false;
            return acc;
        }, {}));
        setNotesState(initialState);
    }, [projectSaveFile.productionDepartments]);
    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };
    const handleCheckboxChange = (department) => {
        setNotesState((prevState) => (Object.assign(Object.assign({}, prevState), { [department]: !prevState[department] })));
    };
    const formatDepartmentName = (department) => {
        return department
            .split(/(?=[A-Z])/)
            .join(" ")
            .replace(/^\w/, (c) => c.toUpperCase());
    };
    const renderCheckboxes = () => {
        return Object.keys(notesState).map((department) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "checkbox-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: `${department}-notes`, name: `${department}-notes`, checked: notesState[department], onChange: () => handleCheckboxChange(department) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: `${department}-notes` }, { children: formatDepartmentName(department) }))] }), department)));
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "rehearsal-notes-modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "rehearsal-notes-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "rehearsal-notes-title" }, { children: "Rehearsal Note" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "rehearsal-notes-departments-box" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "rehearsal-notes-departments-row" }, { children: renderCheckboxes() })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "rehearsal-notes-input-container" }, { children: (0, jsx_runtime_1.jsx)("textarea", { id: "rehearsal-notes-input", value: textInput, onChange: handleTextInputChange, autoFocus: true }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "rehearsal-notes-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-save-button", onClick: () => console.log("Save logic here") }, { children: "Save" }))] }))] })) })) })));
};
exports.default = RehearsalNotes;
