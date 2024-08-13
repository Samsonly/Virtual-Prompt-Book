import React from "react";
import "../styles/OpenProject.css";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import {
  useGlobal,
  SET_LOADING_TYPE,
  UPDATE_PROJECT_ACTIVE_STATUS,
} from "../contexts/GlobalContext";

const OpenProject: React.FC = () => {
  const { dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchProject } = useProject();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const projectData = JSON.parse(e.target?.result as string);
          dispatchProject({
            type: UPDATE_PROJECT_SAVE_FILE,
            payload: projectData,
          });
          dispatchProject({ type: UPDATE_PROJECT_SAVE_STATUS, payload: false });
          dispatchGlobal({ type: SET_LOADING_TYPE, payload: "" });
        } catch (error) {
          console.error("Error parsing project file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const openProject = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".thtr";
    fileInput.style.display = "none";
    fileInput.onchange = handleFileChange as unknown as EventListener;
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const clearProject = () => {
    dispatchGlobal({ type: UPDATE_PROJECT_ACTIVE_STATUS, payload: false });
    dispatchGlobal({ type: SET_LOADING_TYPE, payload: "" });
  };

  return (
    <div id="open-project-modal-background-overlay">
      <div id="open-project-modal-window">
        <div id="open-project-table">
          <div id="open-project-title">Open Project</div>
          <div id="open-project-filetype">
            <button id="open-project-file-button" onClick={openProject}>
              Open Project File
            </button>
            <button id="open-project-folder-button" onClick={openProject}>
              Open Project Folder
            </button>
          </div>
        </div>
        <button id="open-project-close-button" onClick={clearProject}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OpenProject;
