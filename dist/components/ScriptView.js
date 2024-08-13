"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayContent_1 = __importDefault(require("./PlayContent"));
const UploadScript_1 = __importDefault(require("./UploadScript"));
const upload_script_png_1 = __importDefault(require("../assets/upload-script.png"));
const ProjectContext_1 = require("../contexts/ProjectContext");
require("../styles/ScriptView.css");
const ScriptView = () => {
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const isScriptLoaded = Object.keys(projectSaveFile.script).length > 0;
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "script-view" }, { children: isScriptLoaded ? ((0, jsx_runtime_1.jsx)(PlayContent_1.default, { scriptJson: projectSaveFile.script })) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "base-view" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "upload-script-button-container" }, { children: (0, jsx_runtime_1.jsx)(UploadScript_1.default, { children: (0, jsx_runtime_1.jsx)("img", { id: "upload-script-button-icon", src: upload_script_png_1.default, alt: "Upload Script" }) }) })) }))) })));
};
exports.default = ScriptView;
