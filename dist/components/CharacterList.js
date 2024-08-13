"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
require("../styles/CharacterList.css");
const CharacterList = () => {
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const { hideSettings } = (0, SettingsContext_1.useSettings)();
    const characters = projectSaveFile.characterList;
    function editCharacter(name) {
        console.log(`Editing character: ${name}`);
        // Placeholder for logic to edit character details
    }
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-background-overlay" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal-window" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "character-list-table" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "character-list-title" }, { children: "Character List" })), characters.map((character, index) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: () => editCharacter(character.characterName) }, { children: (0, jsx_runtime_1.jsx)("p", { children: character.characterName }) }), index))), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "menu-close-button", onClick: hideSettings }, { children: "Close" }))] })) })) })));
};
exports.default = CharacterList;
