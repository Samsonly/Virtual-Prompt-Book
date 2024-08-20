import React, { useEffect } from "react";
import { useGlobal } from "./contexts/GlobalContext";
import { useProject, ProjectProvider } from "./contexts/ProjectContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ActiveProject from "./components/ActiveProject";

const { ipcRenderer } = window.require("electron");

function App() {
  const { state: globalState } = useGlobal();
  const { isProjectActive } = globalState;

  useEffect(() => {
    ipcRenderer.on("menu-item-click", (event, itemName) => {
      switch (itemName) {
        case "New Project":
          // Handle this within App itself or delegate to GlobalContext
          // handleNewProjectClick logic can go here or call a function within a GlobalContext
          break;
        // Handle any other global actions here...
        default:
          break;
      }
    });

    return () => {
      ipcRenderer.removeAllListeners("menu-item-click");
    };
  }, []);

  return (
    <div id="App">
      {!isProjectActive ? (
        <WelcomeScreen />
      ) : (
        <ProjectProvider>
          <ActiveProject />
        </ProjectProvider>
      )}
    </div>
  );
}

export default App;
