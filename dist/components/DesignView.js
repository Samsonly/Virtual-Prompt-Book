"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const upload_groundplan_png_1 = __importDefault(require("../assets/upload-groundplan.png"));
const ProjectContext_1 = require("../contexts/ProjectContext");
require("../styles/DesignView.css");
const DesignView = () => {
    const { state } = (0, ProjectContext_1.useProject)();
    const { projectSaveFile } = state;
    const onGroundplanUpload = (file) => {
        console.log("Uploading ground plan...", file);
        // dispatch({ type: STORE_GROUNDPLAN_FILE, payload: file });
        // dispatch({ type: SET_CURRENT_DESIGN_VIEW, payload: "groundplanEditor" });
    };
    const uploadGroundplan = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".obj, .zip";
        fileInput.style.display = "none";
        fileInput.onchange = (event) => {
            var _a;
            const target = event.target;
            const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                onGroundplanUpload(file);
            }
            document.body.removeChild(fileInput);
        };
        document.body.appendChild(fileInput);
        fileInput.click();
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "design-view" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "base-design-view" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "upload-groundplan-button-container", onClick: uploadGroundplan }, { children: [(0, jsx_runtime_1.jsx)("img", { id: "upload-groundplan-button-icon", src: upload_groundplan_png_1.default, alt: "Upload Groundplan" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "upload-groundplan-button-text" }, { children: "Upload Groundplan" }))] })) })) })));
};
exports.default = DesignView;
