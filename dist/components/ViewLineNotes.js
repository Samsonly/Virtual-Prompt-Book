"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
require("../styles/ViewLineNotes.css");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProjectContext_1 = require("../contexts/ProjectContext");
const exportLineNotesUtil_1 = __importDefault(require("../utils/exportLineNotesUtil"));
const EditLineNote_1 = __importDefault(require("./EditLineNote"));
const CustomConfirm_1 = __importDefault(require("../containers/CustomConfirm"));
const ViewLineNotes = () => {
    const { hideSettings, showSettings } = (0, SettingsContext_1.useSettings)();
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const storedLineNotes = projectSaveFile.lineNotes;
    const [includeArchived, setIncludeArchived] = (0, react_1.useState)(false);
    const [activeCharacter, setActiveCharacter] = (0, react_1.useState)(null);
    const [activeNote, setActiveNote] = (0, react_1.useState)(null);
    const [showConfirmModal, setShowConfirmModal] = (0, react_1.useState)(false);
    const [noteToDelete, setNoteToDelete] = (0, react_1.useState)(null);
    const formatLineText = (line) => {
        return line.map((word, index) => {
            let formattedText;
            if (word.format === "dropped") {
                formattedText = ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: "droppedWords" }, { children: word.text }), index));
            }
            else if (word.format === "added") {
                formattedText = ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: "addedWords" }, { children: word.text }), index));
            }
            else {
                formattedText = (0, jsx_runtime_1.jsx)("span", { children: word.text }, index);
            }
            return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [formattedText, index < line.length - 1 && " "] }, index));
        });
    };
    const renderCharacterTabs = () => {
        if (!storedLineNotes || storedLineNotes.length === 0)
            return (0, jsx_runtime_1.jsx)("div", { children: "No line notes available." });
        return storedLineNotes.map((note, index) => {
            const character = Object.keys(note)[0];
            return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: `character-tab ${activeCharacter === character ? "active-tab" : ""}`, onClick: () => setActiveCharacter(character) }, { children: character }), character));
        });
    };
    const renderNotesForCharacter = () => {
        if (!activeCharacter)
            return (0, jsx_runtime_1.jsx)("div", { children: "Select a character to view notes." });
        const characterNotes = storedLineNotes.find((note) => note.hasOwnProperty(activeCharacter));
        if (!characterNotes)
            return (0, jsx_runtime_1.jsx)("div", { children: "No notes found for this character." });
        return characterNotes[activeCharacter]
            .filter((note) => includeArchived || note.status === "active")
            .map((note, noteIndex) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `note-entry ${note.status === "archived" ? "archived-note" : ""}`, onMouseLeave: () => setActiveNote(null) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "note-errors" }, { children: note.error.join(", ") })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "note-line" }, { children: formatLineText(note.line) })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-button", onClick: () => setActiveNote(noteIndex) }, { children: "..." })), activeNote === noteIndex && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dropdown-menu active" }, { children: note.status === "active" ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    showSettings(EditLineNote_1.default, {
                                        activeCharacter,
                                        noteIndex,
                                    });
                                } }, { children: "Edit" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleToggleArchiveNote(activeCharacter, noteIndex) }, { children: "Archive" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    setNoteToDelete({
                                        character: activeCharacter,
                                        noteIndex,
                                    });
                                    setShowConfirmModal(true);
                                } }, { children: "Delete" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleToggleArchiveNote(activeCharacter, noteIndex) }, { children: "Unarchive" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                                    setNoteToDelete({
                                        character: activeCharacter,
                                        noteIndex,
                                    });
                                    setShowConfirmModal(true);
                                } }, { children: "Delete" }))] })) })))] }), noteIndex)));
    };
    const handleExport = () => {
        if (activeCharacter) {
            const characterNotesObj = storedLineNotes.find((note) => note.hasOwnProperty(activeCharacter));
            if (!characterNotesObj) {
                alert("No notes found for the selected character.");
                return;
            }
            const characterNotes = characterNotesObj[activeCharacter];
            const activeNotes = characterNotes.filter((note) => note.status === "active");
            if (activeNotes.length === 0) {
                alert("No active notes to export for the selected character.");
                return;
            }
            const activeNotesObj = { [activeCharacter]: activeNotes };
            const doc = (0, exportLineNotesUtil_1.default)([activeNotesObj], activeCharacter);
            doc.save(`${activeCharacter}_line_notes.pdf`);
        }
        else {
            alert("Please select a character to export notes for.");
        }
    };
    const handleToggleArchiveNote = (character, noteIndex) => {
        const updatedLineNotes = storedLineNotes.map((note) => {
            if (note[character]) {
                const updatedCharacterNotes = note[character].map((lineNote, index) => {
                    if (index === noteIndex) {
                        return Object.assign(Object.assign({}, lineNote), { status: lineNote.status === "active" ? "archived" : "active" });
                    }
                    return lineNote;
                });
                return { [character]: updatedCharacterNotes };
            }
            return note;
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { lineNotes: updatedLineNotes },
        });
        setActiveNote(null);
    };
    const handleDeleteNote = (character, noteIndex) => {
        const updatedLineNotes = storedLineNotes.map((note) => {
            if (note[character]) {
                const updatedCharacterNotes = note[character].filter((_, index) => index !== noteIndex);
                return { [character]: updatedCharacterNotes };
            }
            return note;
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { lineNotes: updatedLineNotes },
        });
        setActiveNote(null);
        setShowConfirmModal(false);
    };
    const handleConfirmDelete = () => {
        if (noteToDelete) {
            handleDeleteNote(noteToDelete.character, noteToDelete.noteIndex);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-background-overlay" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-line-notes-table" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-line-notes-title" }, { children: ["View Line Notes", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "include-archived-container" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "include-archived", className: "include-archived-checkbox", checked: includeArchived, onChange: () => setIncludeArchived(!includeArchived) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "include-archived", className: "include-archived-label" }, { children: "Include Archived" }))] })), " "] })), " ", (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "view-line-notes-tabs" }, { children: renderCharacterTabs() })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "view-line-notes-content" }, { children: renderNotesForCharacter() })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "view-line-notes-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-export-button", onClick: handleExport }, { children: "Export" }))] }))] })) })), showConfirmModal && ((0, jsx_runtime_1.jsx)(CustomConfirm_1.default, { message: "Are you sure you want to delete this line note?", onNo: () => setShowConfirmModal(false), onYes: handleConfirmDelete }))] })));
};
exports.default = ViewLineNotes;
