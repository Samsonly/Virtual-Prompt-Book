"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/CastList.css");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const CastList = () => {
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const [cast, setCast] = (0, react_1.useState)(projectSaveFile.castList || []);
    const [suggestions, setSuggestions] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setCast([...(projectSaveFile.castList || [])]);
    }, [projectSaveFile.castList]);
    const updateAssignment = (index, updatedAssignment) => {
        const newCast = [...cast];
        newCast[index] = updatedAssignment;
        setCast(newCast);
    };
    const saveCastList = () => {
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { castList: cast },
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS,
            payload: false,
        });
        hideSettings();
    };
    const createNewAssignment = () => {
        setCast([
            ...cast,
            { department: "main", role: "", assignee: "", email: "" },
        ]);
    };
    const deleteAssignment = (index) => {
        const newCast = cast.filter((_, i) => i !== index);
        setCast(newCast);
    };
    const handleAssigneeChange = (index, value) => {
        const newCast = [...cast];
        newCast[index].assignee = value;
        setCast(newCast);
        if (value.length > 1) {
            setSuggestions(projectSaveFile.contactDirectory.filter((contact) => `${contact.firstName} ${contact.lastName}`
                .toLowerCase()
                .includes(value.toLowerCase())));
        }
        else {
            setSuggestions([]);
        }
    };
    const selectSuggestion = (index, suggestion) => {
        const newCast = [...cast];
        newCast[index].assignee = `${suggestion.firstName} ${suggestion.lastName}`;
        newCast[index].email = suggestion.email;
        setCast(newCast);
        setSuggestions([]);
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "cast-list-modal-window" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "cast-list-title" }, { children: "Cast List" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "cast-list-table" }, { children: [cast.map((assignment, index) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cast-entry" }, { children: [(0, jsx_runtime_1.jsxs)("select", Object.assign({ name: "department", value: assignment.department, onChange: (e) => updateAssignment(index, Object.assign(Object.assign({}, assignment), { department: e.target.value })) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "main" }, { children: "Main" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "understudy" }, { children: "Understudy" }))] })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "role", value: assignment.role, onChange: (e) => updateAssignment(index, Object.assign(Object.assign({}, assignment), { role: e.target.value })), placeholder: "Role" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "assignee", value: assignment.assignee, onChange: (e) => handleAssigneeChange(index, e.target.value), placeholder: "Assignee" }), suggestions.map((s) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: () => selectSuggestion(index, s) }, { children: `${s.firstName} ${s.lastName}` }), s.contactID))), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "email", value: assignment.email, readOnly: true }), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "delete-button", onClick: () => deleteAssignment(index) }, { children: "X" }))] }), index))), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "add-cast-button", onClick: createNewAssignment }, { children: "add new assignment..." }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "cast-list-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-save-button", onClick: saveCastList }, { children: "Save" }))] }))] })) })));
};
exports.default = CastList;
