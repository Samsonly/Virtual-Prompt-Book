import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export const UPDATE_PROJECT_ACTIVE_STATUS = "UPDATE_PROJECT_ACTIVE_STATUS";
export const SET_LOADING_TYPE = "SET_LOADING_TYPE";

type State = {
  isProjectActive: boolean;
  loadingType: string;
};

type Action =
  | { type: typeof UPDATE_PROJECT_ACTIVE_STATUS; payload: boolean }
  | { type: typeof SET_LOADING_TYPE; payload: string };

const initialState: State = {
  isProjectActive: false,
  loadingType: "",
};

const globalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case UPDATE_PROJECT_ACTIVE_STATUS:
      return { ...state, isProjectActive: action.payload };
    case SET_LOADING_TYPE:
      return { ...state, loadingType: action.payload };
    default:
      return state;
  }
};

type GlobalContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
