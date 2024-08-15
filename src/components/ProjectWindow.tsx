import React, { useEffect } from "react";
import CreateNewProject from "./CreateNewProject";
import OpenProject from "./OpenProject";
import { useProject } from "../contexts/ProjectContext";
import { useGlobal } from "../contexts/GlobalContext";
import { useSettings } from "../contexts/SettingsContext";
import RehearsalNotes from "./RehearsalNotes";
import NavigationBar from "./NavigationBar";
import GadgetBar from "./GadgetBar";
import ContentContainer from "./ContentContainer";
import StatusBar from "./StatusBar";
import "../styles/ProjectWindow.css";

const ProjectWindow: React.FC = () => {
  const { state: projectState, dispatch } = useProject();
  const { state: globalState } = useGlobal();
  const { showSettings } = useSettings();
  const { loadingType } = globalState;

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === "n") {
        e.preventDefault();
        showSettings(RehearsalNotes, {});
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [showSettings]);

  return (
    <div id="project-window">
      <NavigationBar />
      <GadgetBar />
      <ContentContainer />
      <StatusBar />
      {loadingType === "new" && <CreateNewProject />}
      {loadingType === "open" && <OpenProject />}
    </div>
  );
};

export default ProjectWindow;
