import React from "react";
import uploadGroundplanImage from "../assets/upload-groundplan.png";
import { useProject } from "../contexts/ProjectContext";
import "../styles/DesignView.css";

const DesignView: React.FC = () => {
  const { state } = useProject();
  const { projectSaveFile } = state;

  const onGroundplanUpload = (file: File) => {
    console.log("Uploading ground plan...", file);
    // dispatch({ type: STORE_GROUNDPLAN_FILE, payload: file });
    // dispatch({ type: SET_CURRENT_DESIGN_VIEW, payload: "groundplanEditor" });
  };

  const uploadGroundplan = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".obj, .zip";
    fileInput.style.display = "none";
    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        onGroundplanUpload(file);
      }
      document.body.removeChild(fileInput);
    };
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  return (
    <div id="design-view">
      <div id="base-design-view">
        <div id="upload-groundplan-button-container" onClick={uploadGroundplan}>
          <img
            id="upload-groundplan-button-icon"
            src={uploadGroundplanImage}
            alt="Upload Groundplan"
          />
          <div id="upload-groundplan-button-text">Upload Groundplan</div>
        </div>
      </div>
    </div>
  );
};

export default DesignView;
