"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ProjectContext_1 = require("../contexts/ProjectContext");
const UploadScript = ({ children, }) => {
    const { dispatch } = (0, ProjectContext_1.useProject)();
    const handleFileChange = (event) => {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                try {
                    const jsonData = JSON.parse((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    const characters = createUniqueCharacterList(jsonData.actStructure);
                    const initialCastList = createInitialCastList(characters);
                    dispatch({
                        type: ProjectContext_1.UPDATE_PROJECT_SAVE_FILE,
                        payload: {
                            script: jsonData,
                            characterList: characters,
                            castList: initialCastList,
                        },
                    });
                    dispatch({ type: ProjectContext_1.UPDATE_PROJECT_SAVE_STATUS, payload: false });
                    dispatch({ type: ProjectContext_1.SET_CURRENT_SCRIPT_VIEW, payload: "script" });
                }
                catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };
            reader.readAsText(file);
        }
    };
    const uploadScript = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";
        fileInput.style.display = "none";
        fileInput.addEventListener("change", handleFileChange);
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    };
    const createUniqueCharacterList = (data) => {
        const names = new Set();
        const extractCharacterNames = (data) => {
            data.forEach((item) => {
                if (item.characterContent && item.characterContent.characterName) {
                    names.add(item.characterContent.characterName.trim().replace(/\.$/, ""));
                }
                else if (item.internalSceneStructure) {
                    extractCharacterNames(item.internalSceneStructure);
                }
                else if (item.sceneStructure) {
                    item.sceneStructure.forEach((scene) => {
                        extractCharacterNames(scene.internalSceneStructure);
                    });
                }
            });
        };
        extractCharacterNames(data);
        return Array.from(names).map((name) => ({
            characterName: name,
            mainActor: [{ actorID: "", actorName: "", actorEmail: "" }],
            understudy: [{ actorID: "", actorName: "", actorEmail: "" }],
        }));
    };
    const createInitialCastList = (characters) => {
        return characters.map((character) => ({
            department: "cast",
            role: character.characterName,
            assignee: "",
            email: "",
        }));
    };
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: uploadScript }, { children: children }));
};
exports.default = UploadScript;
