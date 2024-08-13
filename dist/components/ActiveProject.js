"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SettingsContext_1 = require("../contexts/SettingsContext");
const ProjectWindow_1 = __importDefault(require("./ProjectWindow"));
function ActiveProject() {
    return ((0, jsx_runtime_1.jsx)(SettingsContext_1.SettingsProvider, { children: (0, jsx_runtime_1.jsx)(ProjectWindow_1.default, {}) }));
}
exports.default = ActiveProject;
