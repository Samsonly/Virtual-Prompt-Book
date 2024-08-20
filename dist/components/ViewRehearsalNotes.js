"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/ViewRehearsalNotes.css");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProjectContext_1 = require("../contexts/ProjectContext");
const exportRehearsalNotesUtil_1 = __importDefault(require("../utils/exportRehearsalNotesUtil"));
const EditRehearsalNote_1 = __importDefault(require("./EditRehearsalNote"));
const CustomConfirm_1 = __importDefault(require("../containers/CustomConfirm"));
const ViewRehearsalNotes = () => {
    const { hideSettings, showSettings } = (0, SettingsContext_1.useSettings)();
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const storedRehearsalNotes = projectSaveFile.rehearsalNotes;
    const [includeArchived, setIncludeArchived] = (0, react_1.useState)(false);
    const [activeDepartment, setActiveDepartment] = (0, react_1.useState)(null);
    const [activeNote, setActiveNote] = (0, react_1.useState)(null);
    const [showConfirmModal, setShowConfirmModal] = (0, react_1.useState)(false);
    const [noteToDelete, setNoteToDelete] = (0, react_1.useState)(null);
    const renderDepartmentTabs = () => {
        if (!storedRehearsalNotes || storedRehearsalNotes.length === 0)
            return (0, jsx_runtime_1.jsx)("div", { children: "No rehearsal notes to display" });
        return storedRehearsalNotes.map((note) => {
            const department = Object.keys(note)[0];
            return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: `department-tab ${activeDepartment === activeDepartment ? "active-tab" : ""}`, onClick: () => setActiveDepartment(department) }, { children: department }), department));
        });
    };
    const renderNotesForDepartment = () => {
        if (!activeDepartment)
            return (0, jsx_runtime_1.jsx)("div", { children: "Select a department to view notes" });
        const departmentNotes = storedRehearsalNotes.find((note) => note.hasOwnProperty(activeDepartment));
        if (!departmentNotes)
            return (0, jsx_runtime_1.jsx)("div", { children: "No notes found for this department." });
        return departmentNotes[activeDepartment]
            .filter((note) => includeArchived || note.status === "active")
            .map((note, noteIndex) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `note-entry ${note.status === "archived" ? "archived-note" : ""}`, onMouseLeave: () => setActiveNote(null) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "note-text" }, { children: note.note })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-button", onClick: () => setActiveNote(noteIndex) }, { children: "..." })), activeNote === noteIndex && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dropdown-menu active" }, { children: note.status === "active" ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    showSettings(EditRehearsalNote_1.default, {
                                        activeDepartment,
                                        noteIndex,
                                    });
                                } }, { children: "Edit" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleToggleArchiveNote(activeDepartment, noteIndex) }, { children: "Archive" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    setNoteToDelete({
                                        department: activeDepartment,
                                        noteIndex,
                                    });
                                    setShowConfirmModal(true);
                                } }, { children: "Delete" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleToggleArchiveNote(activeDepartment, noteIndex) }, { children: "Unarchive" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    setNoteToDelete({
                                        department: activeDepartment,
                                        noteIndex,
                                    });
                                    setShowConfirmModal(true);
                                } }, { children: "Delete" }))] })) })))] }), noteIndex)));
    };
    const handleExport = () => {
        if (activeDepartment) {
            const departmentNotesObj = storedRehearsalNotes.find((note) => note.hasOwnProperty(activeDepartment));
            if (!departmentNotesObj) {
                alert("No notes found for the selected department.");
                return;
            }
            const departmentNotes = departmentNotesObj[activeDepartment];
            const activeNotes = departmentNotes.filter((note) => note.status === "active");
            if (activeNotes.length === 0) {
                alert("No active notes to export for the selected department.");
                return;
            }
            const activeNotesObj = { [activeDepartment]: activeNotes };
            const doc = (0, exportRehearsalNotesUtil_1.default)([activeNotesObj], activeDepartment);
            doc.save(`${activeDepartment}_rehearsal_notes.pdf`);
        }
        else {
            alert("Please select a department to export notes for.");
        }
    };
    const handleToggleArchiveNote = (department, noteIndex) => {
        const updatedRehearsalNotes = storedRehearsalNotes.map((note) => {
            if (note[department]) {
                const updatedDepartmentNotes = note[department].map((rehearsalNote, index) => {
                    if (index === noteIndex) {
                        return Object.assign(Object.assign({}, rehearsalNote), { status: rehearsalNote.status === "active" ? "archived" : "active" });
                    }
                    return rehearsalNote;
                });
                return { [department]: updatedDepartmentNotes };
            }
            return note;
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { rehearsalNotes: updatedRehearsalNotes },
        });
        setActiveNote(null);
    };
    const handleDeleteNote = (department, noteIndex) => {
        const updatedRehearsalNotes = storedRehearsalNotes.map((note) => {
            if (note[department]) {
                const updatedDepartmentNotes = note[department].filter((_, index) => index !== noteIndex);
                return { [department]: updatedDepartmentNotes };
            }
            return note;
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { rehearsalNotes: updatedRehearsalNotes },
        });
        setActiveNote(null);
        setShowConfirmModal(false);
    };
    const handleConfirmDelete = () => {
        if (noteToDelete) {
            handleDeleteNote(noteToDelete.department, noteToDelete.noteIndex);
        }
    };
    const handleRehearsalReport = () => {
        // Placeholder function for generating the rehearsal report
        console.log("Generate Rehearsal Report functionality triggered.");
        // Implement the actual report generation logic here
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-background-overlay" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-rehearsal-notes-table" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-rehearsal-notes-title" }, { children: ["View Rehearsal Notes", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "include-archived-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "include-archived", className: "include-archived-checkbox", checked: includeArchived, onChange: () => setIncludeArchived(!includeArchived) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "include-archived", className: "include-archived-label" }, { children: "Include Archived" }))] })), " "] })), " ", (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "view-rehearsal-notes-tabs" }, { children: renderDepartmentTabs() })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "view-rehearsal-notes-content" }, { children: renderNotesForDepartment() })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-rehearsal-notes-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-export-department-button", onClick: handleExport }, { children: "Export Selected Department Notes" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-generate-report-button", onClick: handleRehearsalReport }, { children: "Generate Rehearsal Report" }))] }))] })) })), showConfirmModal && ((0, jsx_runtime_1.jsx)(CustomConfirm_1.default, { message: "Are you sure you want to delete this rehearsal note?", onNo: () => setShowConfirmModal(false), onYes: handleConfirmDelete }))] })));
};
exports.default = ViewRehearsalNotes;
