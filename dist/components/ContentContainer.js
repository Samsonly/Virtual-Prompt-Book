"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_split_1 = __importDefault(require("react-split"));
const ScriptView_1 = __importDefault(require("./ScriptView"));
const DesignView_1 = __importDefault(require("./DesignView"));
const ProjectContext_1 = require("../contexts/ProjectContext");
require("../styles/ContentContainer.css");
function ContentContainer() {
    const { state, dispatch } = (0, ProjectContext_1.useProject)();
    const { layoutIsInverted, verticalPaneSizes } = state;
    const handleDragEnd = (sizes) => {
        dispatch({ type: ProjectContext_1.SET_VERTICAL_PANE_SIZES, payload: verticalPaneSizes });
    };
    const horizontalGutter = () => {
        const gutterElement = document.createElement("div");
        gutterElement.id = "middle-gutter";
        return gutterElement;
    };
    const handleSwapSides = () => {
        if (!layoutIsInverted) {
            dispatch({ type: ProjectContext_1.SET_INVERTED_LAYOUT, payload: true });
        }
        else {
            dispatch({ type: ProjectContext_1.SET_INVERTED_LAYOUT, payload: false });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "middle-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "left-bar" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "swap-sides-button", onClick: handleSwapSides }, { children: "\u21C4" })) })), (0, jsx_runtime_1.jsxs)(react_split_1.default, Object.assign({ style: { display: "flex", flexGrow: 1 }, sizes: verticalPaneSizes, minSize: [100, 100], direction: "horizontal", gutterSize: 3, gutter: horizontalGutter, cursor: "col-resize", onDragEnd: handleDragEnd }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ id: "left-display" }, { children: layoutIsInverted ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "design-display" }, { children: (0, jsx_runtime_1.jsx)(DesignView_1.default, {}) }))) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "script-display" }, { children: (0, jsx_runtime_1.jsx)(ScriptView_1.default, {}) }))) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "right-display" }, { children: !layoutIsInverted ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "design-display" }, { children: (0, jsx_runtime_1.jsx)(DesignView_1.default, {}) }))) : ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: "script-display" }, { children: (0, jsx_runtime_1.jsx)(ScriptView_1.default, {}) }))) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "right-bar" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "swap-sides-button", onClick: handleSwapSides }, { children: "\u21C4" })) }))] })));
}
exports.default = ContentContainer;
