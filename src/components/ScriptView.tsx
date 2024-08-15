import React from "react";
import PlayContent from "./PlayContent";
import UploadScript from "./UploadScript";
import uploadScriptImage from "../assets/upload-script.png";
import { useProject } from "../contexts/ProjectContext";
import "../styles/ScriptView.css";

const ScriptView: React.FC = () => {
  const { state } = useProject();
  const { projectSaveFile } = state;
  const isScriptLoaded = Object.keys(projectSaveFile.script).length > 0;

  return (
    <div id="script-view">
      {isScriptLoaded ? (
        <PlayContent scriptJson={projectSaveFile.script} />
      ) : (
        <div id="base-view">
          <div id="upload-script-button-container">
            <UploadScript>
              <img
                id="upload-script-button-icon"
                src={uploadScriptImage}
                alt="Upload Script"
              />
            </UploadScript>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptView;
