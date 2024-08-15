"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProvider = exports.useSettings = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SettingsContext = (0, react_1.createContext)(undefined);
const useSettings = () => {
    const context = (0, react_1.useContext)(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
exports.useSettings = useSettings;
const SettingsProvider = ({ children, }) => {
    const [modalStack, setModalStack] = (0, react_1.useState)([]);
    const showSettings = (Component, props = {}) => {
        const ModalComponent = (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props), modalStack.length);
        setModalStack([...modalStack, ModalComponent]);
    };
    const hideSettings = () => {
        setModalStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    };
    return ((0, jsx_runtime_1.jsxs)(SettingsContext.Provider, Object.assign({ value: { showSettings, hideSettings } }, { children: [children, modalStack.length > 0 && modalStack[modalStack.length - 1]] })));
};
exports.SettingsProvider = SettingsProvider;
