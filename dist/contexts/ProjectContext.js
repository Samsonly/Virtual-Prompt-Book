"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProject = exports.ProjectProvider = exports.ProjectContext = exports.SET_SCRIPT_SCROLL_POSITION = exports.SET_CURRENT_SCRIPT_VIEW = exports.SET_INVERTED_LAYOUT = exports.SET_VERTICAL_PANE_SIZES = exports.UPDATE_PROJECT_SAVE_STATUS = exports.UPDATE_PROJECT_SAVE_FILE = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.UPDATE_PROJECT_SAVE_FILE = "UPDATE_PROJECT_SAVE_FILE";
exports.UPDATE_PROJECT_SAVE_STATUS = "UPDATE_PROJECT_SAVE_STATUS";
exports.SET_VERTICAL_PANE_SIZES = "SET_VERTICAL_PANE_SIZES";
exports.SET_INVERTED_LAYOUT = "SET_INVERTED_LAYOUT";
exports.SET_CURRENT_SCRIPT_VIEW = "SET_CURRENT_SCRIPT_VIEW";
exports.SET_SCRIPT_SCROLL_POSITION = "SET_SCRIPT_SCROLL_POSITION";
const initialState = {
    projectSaveFile: {
        projectName: "",
        script: {},
        characterList: [],
        contactDirectory: [],
        castList: [],
        lineNotes: [],
        productionTeam: [
            {
                department: "scenic",
                assignee: "",
                email: "",
            },
            {
                department: "lighting",
                assignee: "",
                email: "",
            },
            {
                department: "sound",
                assignee: "",
                email: "",
            },
            {
                department: "costumes",
                assignee: "",
                email: "",
            },
            {
                department: "props",
                assignee: "",
                email: "",
            },
            {
                department: "director",
                assignee: "",
                email: "",
            },
            {
                department: "stageManager",
                assignee: "",
                email: "",
            },
        ],
        productionDepartments: [],
        rehearsalNotes: [],
    },
    isProjectSaved: false,
    verticalPaneSizes: [50, 50],
    layoutIsInverted: false,
    currentScriptView: "baseView",
    scriptScrollPosition: 0,
};
const projectReducer = (state, action) => {
    switch (action.type) {
        case exports.UPDATE_PROJECT_SAVE_FILE:
            return Object.assign(Object.assign({}, state), { projectSaveFile: Object.assign(Object.assign({}, state.projectSaveFile), action.payload) });
        case exports.UPDATE_PROJECT_SAVE_STATUS:
            return Object.assign(Object.assign({}, state), { isProjectSaved: action.payload });
        case exports.SET_VERTICAL_PANE_SIZES:
            return Object.assign(Object.assign({}, state), { verticalPaneSizes: action.payload });
        case exports.SET_INVERTED_LAYOUT:
            return Object.assign(Object.assign({}, state), { layoutIsInverted: action.payload });
        case exports.SET_CURRENT_SCRIPT_VIEW:
            return Object.assign(Object.assign({}, state), { currentScriptView: action.payload });
        case exports.SET_SCRIPT_SCROLL_POSITION:
            return Object.assign(Object.assign({}, state), { scriptScrollPosition: action.payload });
        default:
            return state;
    }
};
exports.ProjectContext = (0, react_1.createContext)(undefined);
const ProjectProvider = ({ children, }) => {
    const [state, dispatch] = (0, react_1.useReducer)(projectReducer, initialState);
    return ((0, jsx_runtime_1.jsx)(exports.ProjectContext.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
exports.ProjectProvider = ProjectProvider;
const useProject = () => {
    const context = (0, react_1.useContext)(exports.ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
exports.useProject = useProject;
