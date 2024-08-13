"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const GlobalContext_1 = require("../contexts/GlobalContext");
require("../styles/WelcomeScreen.css");
function WelcomeScreen() {
    const { dispatch } = (0, GlobalContext_1.useGlobal)();
    const activateProject = (loadingType) => {
        dispatch({ type: GlobalContext_1.SET_LOADING_TYPE, payload: `${loadingType}` });
        dispatch({ type: GlobalContext_1.UPDATE_PROJECT_ACTIVE_STATUS, payload: true });
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "welcome-screen" }, { children: [(0, jsx_runtime_1.jsx)("div", { id: "welcome-banner" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ id: "welcome-header" }, { children: "Create or Choose a Project to Manage" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "welcome-button-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ id: "welcome-create-button", onClick: () => activateProject("new") }, { children: "Create New Project" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ id: "welcome-open-button", onClick: () => activateProject("open") }, { children: "Open Project" }))] }))] })));
}
exports.default = WelcomeScreen;
