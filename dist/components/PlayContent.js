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
const LineNotes_1 = __importDefault(require("./LineNotes"));
const ProjectContext_1 = require("../contexts/ProjectContext");
const SettingsContext_1 = require("../contexts/SettingsContext");
const PlayContent = ({ scriptJson }) => {
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { scriptScrollPosition } = state;
    const playContentRef = (0, react_1.useRef)(null);
    const { showSettings } = (0, SettingsContext_1.useSettings)();
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            if (playContentRef.current) {
                dispatch({
                    type: ProjectContext_1.SET_SCRIPT_SCROLL_POSITION,
                    payload: playContentRef.current.scrollTop,
                });
            }
        };
        const playContentElement = playContentRef.current;
        playContentElement === null || playContentElement === void 0 ? void 0 : playContentElement.addEventListener("scroll", handleScroll);
        return () => {
            playContentElement === null || playContentElement === void 0 ? void 0 : playContentElement.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        if (playContentRef.current) {
            playContentRef.current.scrollTop = scriptScrollPosition;
        }
    }, [scriptScrollPosition]);
    (0, react_1.useEffect)(() => {
        const handleMouseDown = (e) => {
            if (e.shiftKey) {
                e.preventDefault();
            }
        };
        const playContentElement = playContentRef.current;
        playContentElement === null || playContentElement === void 0 ? void 0 : playContentElement.addEventListener("mousedown", handleMouseDown);
        return () => {
            playContentElement === null || playContentElement === void 0 ? void 0 : playContentElement.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
    const handleShiftClick = (event, characterName, dialogue) => {
        if (event.shiftKey) {
            showSettings(LineNotes_1.default, {
                characterName: characterName.slice(0, -1),
                characterDialogue: dialogue.tagContent,
            });
        }
    };
    const formatContent = (content) => {
        const tagMap = {
            em: "em",
            i: "i",
            b: "b",
            u: "u",
        };
        const regex = new RegExp(Object.keys(tagMap)
            .map((tag) => `</?${tag}>`)
            .join("|"), "gi");
        const parts = content.split(regex);
        const tags = content.match(regex) || [];
        const stack = [];
        return parts.reduce((acc, part, index) => {
            if (index === 0) {
                return [(0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: part }, index)];
            }
            const tag = tags[index - 1];
            if (tag) {
                const tagName = tag.replace(/[<>/]/g, "").toLowerCase();
                if (tag.startsWith("</")) {
                    stack.pop();
                }
                else {
                    stack.push(tagMap[tagName]);
                }
                const CurrentComponent = stack.length > 0 ? stack[stack.length - 1] : react_1.default.Fragment;
                acc.push((0, jsx_runtime_1.jsx)(CurrentComponent, { children: part }, index));
            }
            else {
                acc.push((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: part }, index));
            }
            return acc;
        }, []);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "playStructure", ref: playContentRef }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "playTitle", id: "playTitle" }, { children: scriptJson.playTitle })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "playDescription" }, { children: scriptJson.playDescription })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "actStructure" }, { children: scriptJson.actStructure.map((act, actIndex) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "act" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "actTitle", id: `actTitle${actIndex}` }, { children: act.actTitle })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "actDescription" }, { children: act.actDescription })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sceneStructure" }, { children: act.sceneStructure.map((scene, sceneIndex) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "scene" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sceneTitle", id: `sceneTitle${actIndex}${sceneIndex}` }, { children: scene.sceneTitle })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sceneLocation" }, { children: scene.sceneLocation })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sceneDescription" }, { children: scene.sceneDescription })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "internalSceneStructure" }, { children: scene.internalSceneStructure.map((content, contentIndex) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: content.stgdContent
                                                ? "stgdContent"
                                                : content.characterContent
                                                    ? "characterContent"
                                                    : "" }, { children: [content.stgdContent &&
                                                    content.stgdContent.map((item, itemIndex) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "stageDirections" }, { children: formatContent(item.tagContent) }), itemIndex))), content.characterContent && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: `characterName ${content.characterContent.characterName
                                                                .toLowerCase()
                                                                .replace(/\s+/g, "-")
                                                                .slice(0, -1)}` }, { children: content.characterContent.characterName }), contentIndex), content.characterContent.characterAction.map((action, actionIndex) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: action.tagType === "d"
                                                                ? "characterDialogue"
                                                                : "characterDirection", onClick: (e) => handleShiftClick(e, content.characterContent.characterName, action) }, { children: formatContent(action.tagContent) }), actionIndex)))] }))] }), contentIndex))) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "sceneEnding" }, { children: scene.sceneEnding }))] }), sceneIndex))) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "actEnding" }, { children: act.actEnding }))] }), actIndex))) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "playEnding" }, { children: scriptJson.playEnding }))] })));
};
exports.default = PlayContent;
