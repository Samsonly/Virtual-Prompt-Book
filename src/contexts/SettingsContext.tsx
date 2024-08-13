import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";

type SettingsContextType = {
  showSettings: (Component: React.FC<any>, props?: any) => void;
  hideSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalStack, setModalStack] = useState<ReactElement[]>([]);

  const showSettings = (Component: React.FC<any>, props = {}) => {
    const ModalComponent = <Component key={modalStack.length} {...props} />;
    setModalStack([...modalStack, ModalComponent]);
  };

  const hideSettings = () => {
    setModalStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
  };

  return (
    <SettingsContext.Provider value={{ showSettings, hideSettings }}>
      {children}
      {modalStack.length > 0 && modalStack[modalStack.length - 1]}
    </SettingsContext.Provider>
  );
};
