import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export const UPDATE_PROJECT_SAVE_FILE = "UPDATE_PROJECT_SAVE_FILE";
export const UPDATE_PROJECT_SAVE_STATUS = "UPDATE_PROJECT_SAVE_STATUS";
export const SET_VERTICAL_PANE_SIZES = "SET_VERTICAL_PANE_SIZES";
export const SET_INVERTED_LAYOUT = "SET_INVERTED_LAYOUT";
export const SET_CURRENT_SCRIPT_VIEW = "SET_CURRENT_SCRIPT_VIEW";
export const SET_SCRIPT_SCROLL_POSITION = "SET_SCRIPT_SCROLL_POSITION";

type ProjectSaveFile = {
  projectName: string;
  script: Record<string, unknown>;
  characterList: any[];
  contactDirectory: any[];
  castList: any[];
  lineNotes: any[];
  productionTeam: any[];
  productionDepartments: any[];
  rehearsalNotes: any[];
};

type State = {
  projectSaveFile: ProjectSaveFile;
  isProjectSaved: boolean;
  verticalPaneSizes: [number, number];
  layoutIsInverted: boolean;
  currentScriptView: string;
  scriptScrollPosition: number;
};

type Action =
  | { type: typeof UPDATE_PROJECT_SAVE_FILE; payload: Partial<ProjectSaveFile> }
  | { type: typeof UPDATE_PROJECT_SAVE_STATUS; payload: boolean }
  | { type: typeof SET_VERTICAL_PANE_SIZES; payload: [number, number] }
  | { type: typeof SET_INVERTED_LAYOUT; payload: boolean }
  | { type: typeof SET_CURRENT_SCRIPT_VIEW; payload: string }
  | { type: typeof SET_SCRIPT_SCROLL_POSITION; payload: number };

const initialState: State = {
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

const projectReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case UPDATE_PROJECT_SAVE_FILE:
      return {
        ...state,
        projectSaveFile: { ...state.projectSaveFile, ...action.payload },
      };
    case UPDATE_PROJECT_SAVE_STATUS:
      return { ...state, isProjectSaved: action.payload };
    case SET_VERTICAL_PANE_SIZES:
      return { ...state, verticalPaneSizes: action.payload };
    case SET_INVERTED_LAYOUT:
      return { ...state, layoutIsInverted: action.payload };
    case SET_CURRENT_SCRIPT_VIEW:
      return { ...state, currentScriptView: action.payload };
    case SET_SCRIPT_SCROLL_POSITION:
      return { ...state, scriptScrollPosition: action.payload };
    default:
      return state;
  }
};

type ProjectContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
