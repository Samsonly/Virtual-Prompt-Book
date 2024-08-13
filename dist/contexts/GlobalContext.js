"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobal = exports.GlobalProvider = exports.GlobalContext = exports.SET_LOADING_TYPE = exports.UPDATE_PROJECT_ACTIVE_STATUS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.UPDATE_PROJECT_ACTIVE_STATUS = "UPDATE_PROJECT_ACTIVE_STATUS";
exports.SET_LOADING_TYPE = "SET_LOADING_TYPE";
const initialState = {
    isProjectActive: false,
    loadingType: "",
};
const globalReducer = (state, action) => {
    switch (action.type) {
        case exports.UPDATE_PROJECT_ACTIVE_STATUS:
            return Object.assign(Object.assign({}, state), { isProjectActive: action.payload });
        case exports.SET_LOADING_TYPE:
            return Object.assign(Object.assign({}, state), { loadingType: action.payload });
        default:
            return state;
    }
};
exports.GlobalContext = (0, react_1.createContext)(undefined);
const GlobalProvider = ({ children, }) => {
    const [state, dispatch] = (0, react_1.useReducer)(globalReducer, initialState);
    return ((0, jsx_runtime_1.jsx)(exports.GlobalContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
exports.GlobalProvider = GlobalProvider;
const useGlobal = () => {
    const context = (0, react_1.useContext)(exports.GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};
exports.useGlobal = useGlobal;
