"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/ProductionTeam.css");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProductionTeam = () => {
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const [productionTeam, setProductionTeam] = (0, react_1.useState)(projectSaveFile.productionTeam || []);
    const [suggestions, setSuggestions] = (0, react_1.useState)([]);
    // Mapping of display names to stored values
    const departmentMapping = {
        "Select Department": "select",
        Scenic: "scenic",
        Lighting: "lighting",
        Sound: "sound",
        Costumes: "costumes",
        Props: "props",
        Director: "director",
        "Stage Manager": "stageManager",
    };
    // Reverse mapping for display purposes
    const departmentDisplayMapping = Object.fromEntries(Object.entries(departmentMapping).map(([key, value]) => [value, key]));
    (0, react_1.useEffect)(() => {
        setProductionTeam([...(projectSaveFile.productionTeam || [])]);
    }, [projectSaveFile.productionTeam]);
    const updateAssignment = (index, updatedAssignment) => {
        const newProductionTeam = [...productionTeam];
        newProductionTeam[index] = updatedAssignment;
        setProductionTeam(newProductionTeam);
    };
    const saveProductionTeam = () => {
        // Purge entries where all fields are blank
        const cleanedProductionTeam = productionTeam.filter((assignment) => assignment.department !== "" ||
            assignment.assignee !== "" ||
            assignment.email !== "");
        // Update department field for "Select Department" option
        const finalProductionTeam = cleanedProductionTeam.map((assignment) => assignment.department === "select"
            ? Object.assign(Object.assign({}, assignment), { department: "" }) : assignment);
        // Create unique list of departments
        const productionDepartments = Array.from(new Set(finalProductionTeam
            .map((assignment) => assignment.department)
            .filter((dept) => dept !== "")));
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { productionTeam: finalProductionTeam, productionDepartments },
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS,
            payload: false,
        });
        hideSettings();
    };
    const createNewAssignment = () => {
        setProductionTeam([
            ...productionTeam,
            { department: "select", assignee: "", email: "" },
        ]);
    };
    const deleteAssignment = (index) => {
        const newProductionTeam = productionTeam.filter((_, i) => i !== index);
        setProductionTeam(newProductionTeam);
    };
    const handleAssigneeChange = (index, value) => {
        const newProductionTeam = [...productionTeam];
        newProductionTeam[index].assignee = value;
        setProductionTeam(newProductionTeam);
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
        const newProductionTeam = [...productionTeam];
        newProductionTeam[index].assignee = `${suggestion.firstName} ${suggestion.lastName}`;
        newProductionTeam[index].email = suggestion.email;
        setProductionTeam(newProductionTeam);
        setSuggestions([]);
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "production-team-modal-window" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "production-team-title" }, { children: "Production Team" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "production-team-table" }, { children: [productionTeam.map((assignment, index) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "production-team-entry" }, { children: [(0, jsx_runtime_1.jsx)("select", Object.assign({ name: "department", value: assignment.department || "select", onChange: (e) => updateAssignment(index, Object.assign(Object.assign({}, assignment), { department: e.target.value })) }, { children: Object.keys(departmentMapping).map((displayName) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: departmentMapping[displayName] }, { children: displayName }), displayName))) })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "assignee", value: assignment.assignee, onChange: (e) => handleAssigneeChange(index, e.target.value), placeholder: "Assignee" }), suggestions.map((s) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: () => selectSuggestion(index, s) }, { children: `${s.firstName} ${s.lastName}` }), s.contactID))), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "email", value: assignment.email, readOnly: true }), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "delete-button", onClick: () => deleteAssignment(index) }, { children: "X" }))] }), index))), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "add-assignment-button", onClick: createNewAssignment }, { children: "add new assignment..." }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "production-team-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-save-button", onClick: saveProductionTeam }, { children: "Save" }))] }))] })) })));
};
exports.default = ProductionTeam;
