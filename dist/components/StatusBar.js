"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ProjectContext_1 = require("../contexts/ProjectContext");
require("../styles/StatusBar.css");
const StatusBar = () => {
    const { state } = (0, ProjectContext_1.useProject)();
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "status-bar" }, { children: "Status Bar" }));
};
exports.default = StatusBar;
