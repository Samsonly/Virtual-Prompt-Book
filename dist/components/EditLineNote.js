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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
require("../styles/LineNotes.css");
const EditLineNote = ({ activeCharacter, noteIndex, }) => {
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const characterName = activeCharacter;
    const note = projectSaveFile.lineNotes.find((charNotes) => Object.keys(charNotes)[0] === characterName)[characterName][noteIndex];
    const [dialogueWords, setDialogueWords] = (0, react_1.useState)(() => {
        const words = note.line.flatMap((word) => [
            Object.assign({}, word),
            { text: " ", format: "space" },
        ]);
        words.push({ text: " ", format: "space" });
        return words;
    });
    const [lineCalled, setLineCalled] = (0, react_1.useState)(note.error.includes("Line Called"));
    const [wrongWords, setWrongWords] = (0, react_1.useState)(note.error.includes("Wrong Word(s)"));
    const [addedWords, setAddedWords] = (0, react_1.useState)(note.error.includes("Added Word(s)"));
    const [droppedWords, setDroppedWords] = (0, react_1.useState)(note.error.includes("Dropped Word(s)"));
    const [outOfOrder, setOutOfOrder] = (0, react_1.useState)(note.error.includes("Out of Order"));
    const [missedCue, setMissedCue] = (0, react_1.useState)(note.error.includes("Missed Cue"));
    const [jumpedCue, setJumpedCue] = (0, react_1.useState)(note.error.includes("Jumped Cue"));
    const [other, setOther] = (0, react_1.useState)(note.error.includes("Other"));
    const [activeInput, setActiveInput] = (0, react_1.useState)(null);
    const inputRef = (0, react_1.useRef)([]);
    const isHandlingWordClick = (0, react_1.useRef)(false);
    const handleWordClick = (index) => {
        isHandlingWordClick.current = true;
        setDialogueWords((prevWords) => {
            const newWords = prevWords.map((word, idx) => (Object.assign({}, word)));
            if (addedWords && newWords[index].format === "space") {
                const newInput = {
                    text: "",
                    format: "",
                    inputWidth: "1ch",
                };
                newWords.splice(index + 1, 0, newInput);
                newWords.splice(index + 2, 0, { text: " ", format: "space" });
                setActiveInput(index + 1);
            }
            else if (droppedWords && newWords[index].format === "static") {
                newWords[index].format = "dropped";
            }
            else if (droppedWords && newWords[index].format === "dropped") {
                newWords[index].format = "static";
            }
            else if (newWords[index].format === "added") {
                newWords[index].format = "";
                setActiveInput(index);
            }
            return newWords;
        });
        setTimeout(() => {
            var _a, _b, _c;
            if (inputRef.current[index + 1] && addedWords) {
                (_a = inputRef.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else if (inputRef.current[index]) {
                (_b = inputRef.current[index]) === null || _b === void 0 ? void 0 : _b.focus();
                (_c = inputRef.current[index]) === null || _c === void 0 ? void 0 : _c.select();
            }
            isHandlingWordClick.current = false;
        }, 0);
    };
    const handleInputChange = (index, event) => {
        const hiddenMeasurer = document.getElementById("hiddenMeasurer");
        if (hiddenMeasurer) {
            hiddenMeasurer.textContent = event.target.value || " ";
            const width = hiddenMeasurer.offsetWidth;
            setDialogueWords(dialogueWords.map((word, idx) => {
                if (idx === index) {
                    return Object.assign(Object.assign({}, word), { text: event.target.value, inputWidth: `${width + 1}px` });
                }
                return word;
            }));
        }
    };
    const handleInputBlur = (index) => {
        setDialogueWords((prevWords) => {
            if (prevWords[index].text.trim() === "") {
                return prevWords.filter((word, idx) => idx !== index && idx !== index + 1);
            }
            else {
                return prevWords.map((word, idx) => {
                    if (idx === index) {
                        return Object.assign(Object.assign({}, word), { format: "added" });
                    }
                    return word;
                });
            }
        });
        setActiveInput(null);
    };
    const saveLineNote = () => {
        inputRef.current.forEach((input) => {
            if (input)
                input.blur();
        });
        const filteredDialogueWords = dialogueWords.filter((word) => word.format !== "space");
        const formattedDialogue = filteredDialogueWords.reduce((acc, word) => {
            if (word.format === "added") {
                return acc.concat(word.text.split(/\s+/).map((w) => ({
                    text: w,
                    format: "added",
                })));
            }
            else {
                return acc.concat({
                    text: word.text,
                    format: word.format,
                });
            }
        }, []);
        const errors = getActiveErrors();
        let updatedLineNotes = projectSaveFile.lineNotes.map((charNotes) => {
            const character = Object.keys(charNotes)[0];
            if (character === characterName) {
                return {
                    [character]: charNotes[character].map((existingNote, noteIdx) => noteIdx === noteIndex
                        ? { line: formattedDialogue, error: errors }
                        : existingNote),
                };
            }
            return charNotes;
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
            payload: { lineNotes: updatedLineNotes },
        });
        dispatch({
            type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS,
            payload: false,
        });
        hideSettings();
    };
    function getActiveErrors() {
        const errors = [];
        if (addedWords)
            errors.push("Added Word(s)");
        if (droppedWords)
            errors.push("Dropped Word(s)");
        if (wrongWords)
            errors.push("Wrong Word(s)");
        if (outOfOrder)
            errors.push("Out of Order");
        if (missedCue)
            errors.push("Missed Cue");
        if (jumpedCue)
            errors.push("Jumped Cue");
        if (lineCalled)
            errors.push("Line Called");
        if (other)
            errors.push("Other");
        return errors;
    }
    const handleStartOfLine = (event) => {
        if (addedWords) {
            const clickY = event.clientY;
            const spans = document.querySelectorAll("#line-notes-correct-dialogue span");
            let targetIndex = -1;
            for (let i = 0; i < spans.length; i++) {
                const spanRect = spans[i].getBoundingClientRect();
                if (spanRect.top <= clickY && spanRect.bottom >= clickY) {
                    targetIndex = i;
                    break;
                }
            }
            if (targetIndex !== -1) {
                setDialogueWords((prevWords) => {
                    const newWords = prevWords.map((word, idx) => (Object.assign({}, word)));
                    const newInput = {
                        text: "",
                        format: "",
                        inputWidth: "1ch",
                    };
                    newWords.splice(targetIndex, 0, newInput);
                    newWords.splice(targetIndex + 1, 0, { text: " ", format: "space" });
                    setActiveInput(targetIndex);
                    return newWords;
                });
                setTimeout(() => {
                    var _a;
                    if (inputRef.current[targetIndex]) {
                        (_a = inputRef.current[targetIndex]) === null || _a === void 0 ? void 0 : _a.focus();
                    }
                }, 0);
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "line-notes-modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "line-notes-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "line-notes-title" }, { children: "Edit Line Note" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "line-notes-character-name" }, { children: characterName })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "line-notes-error-options-box" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "line-notes-error-options-row" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "added-words", name: "added-words", checked: addedWords, onChange: () => setAddedWords(!addedWords) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "added-words" }, { children: "Added Word(s)" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "dropped-words", name: "dropped-words", checked: droppedWords, onChange: () => setDroppedWords(!droppedWords) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "dropped-words" }, { children: "Dropped Word(s)" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "wrong-words", name: "wrong-words", checked: wrongWords, onChange: () => setWrongWords(!wrongWords) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "wrong-words" }, { children: "Wrong Word(s)" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "out-of-order", name: "out-of-order", checked: outOfOrder, onChange: () => setOutOfOrder(!outOfOrder) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "out-of-order" }, { children: "Out of Order" }))] })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "line-notes-error-options-row" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "missed-cue", name: "missed-cue", checked: missedCue, onChange: () => setMissedCue(!missedCue) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "missed-cue" }, { children: "Missed Cue" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "jumped-cue", name: "jumped-cue", checked: jumpedCue, onChange: () => setJumpedCue(!jumpedCue) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "jumped-cue" }, { children: "Jumped Cue" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "called-line", name: "called-line", checked: lineCalled, onChange: () => setLineCalled(!lineCalled) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "called-line" }, { children: "Line Called" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "other", name: "other", checked: other, onChange: () => setOther(!other) }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "other" }, { children: "Other" }))] })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "line-notes-correct-dialogue-container" }, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    width: "1ch",
                                    height: "100%",
                                    display: "inline-block",
                                    cursor: "text",
                                    flexShrink: 0,
                                }, onClick: handleStartOfLine }), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "line-notes-correct-dialogue" }, { children: dialogueWords.map((word, index) => ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: word.format === "" && activeInput === index ? ((0, jsx_runtime_1.jsx)("input", { id: `input-${index}`, ref: (el) => (inputRef.current[index] = el), type: "text", value: word.text, onChange: (event) => handleInputChange(index, event), onBlur: () => handleInputBlur(index), onKeyDown: (e) => {
                                            if (e.key === "Enter") {
                                                handleInputBlur(index);
                                            }
                                        }, style: {
                                            width: word.inputWidth,
                                            fontFamily: "Heuristica",
                                            fontSize: "20px",
                                            height: "18px",
                                        } })) : ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${word.format === "dropped"
                                            ? "line-notes-dropped-text"
                                            : ""} ${word.format === "added"
                                            ? "line-notes-added-text"
                                            : word.format === "space"
                                                ? "line-notes-space"
                                                : "line-notes-static-text"}`, onClick: () => handleWordClick(index) }, { children: word.text }))) }, index))) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "line-notes-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-save-button", onClick: saveLineNote }, { children: "Save" }))] })), (0, jsx_runtime_1.jsx)("span", { id: "hiddenMeasurer", className: "hidden-measurer", style: {
                            position: "absolute",
                            visibility: "hidden",
                            whiteSpace: "nowrap",
                            fontSize: "20px",
                            fontFamily: "Heuristica",
                        } })] })) })) })));
};
exports.default = EditLineNote;
