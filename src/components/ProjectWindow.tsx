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
import UploadScript from "./UploadScript";
import CharacterList from "./CharacterList";
import ContactDatabase from "./ContactDatabase";
import ProductionTeam from "./ProductionTeam";
import CastList from "./CastList";
import EndRehearsal from "./EndRehearsal";
import ViewLineNotes from "./ViewLineNotes";

const { ipcRenderer } = window.require("electron");

const ProjectWindow: React.FC = () => {
  const { state: projectState } = useProject();
  const { state: globalState } = useGlobal();
  const { showSettings, hideSettings } = useSettings();
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

  useEffect(() => {
    const listener = (event: any, itemName: string) => {
      switch (itemName) {
        // Project menu
        case "New Project":
          showSettings(CreateNewProject);
          break;
        case "Open Project":
          showSettings(OpenProject);
          break;
        case "Save Project":
          // Implement save logic here
          break;

        // Content menu
        case "Upload Script":
          showSettings(UploadScript);
          break;
        case "Character List":
          showSettings(CharacterList);
          break;

        // Team menu
        case "Contact List":
          showSettings(ContactDatabase);
          break;
        case "Production Team":
          showSettings(ProductionTeam);
          break;
        case "Cast List":
          showSettings(CastList);
          break;

        // Rehearsal menu
        case "End Rehearsal":
          showSettings(EndRehearsal);
          break;

        // Reports menu
        case "View Line Notes":
          showSettings(ViewLineNotes);
          break;

        default:
          break;
      }
    };

    ipcRenderer.on("menu-item-click", listener);

    // Clean up the event listener on unmount
    return () => {
      ipcRenderer.removeListener("menu-item-click", listener);
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
