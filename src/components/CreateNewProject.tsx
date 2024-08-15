import React, { useState, useRef, useEffect } from "react";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import {
  useGlobal,
  UPDATE_PROJECT_ACTIVE_STATUS,
  SET_LOADING_TYPE,
} from "../contexts/GlobalContext";
import "../styles/CreateNewProject.css";

const CreateNewProject: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const { dispatch: projectDispatch } = useProject();
  const { dispatch: globalDispatch } = useGlobal();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on the input field after the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCreateProject = () => {
    if (!projectName) {
      alert("Please enter a project name.");
      return;
    }

    projectDispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { projectName },
    });
    projectDispatch({ type: UPDATE_PROJECT_SAVE_STATUS, payload: false });
    globalDispatch({ type: SET_LOADING_TYPE, payload: "" });
  };

  const clearProject = () => {
    globalDispatch({ type: UPDATE_PROJECT_ACTIVE_STATUS, payload: false });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateProject();
    }
  };

  return (
    <div id="new-project-modal-background-overlay">
      <div id="new-project-modal-window">
        <div id="new-project-table">
          <div id="new-project-title">Create New Project</div>
          <div id="new-project-name-form">
            <label htmlFor="new-project-name">Project Name:</label>
            <input
              type="text"
              id="new-project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter project name"
              ref={inputRef}
            />
          </div>
        </div>
        <button id="create-new-project-close-button" onClick={clearProject}>
          Close
        </button>
        <button id="create-new-project-button" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateNewProject;
