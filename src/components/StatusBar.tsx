import React from "react";
import {
  useProject,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import "../styles/StatusBar.css";

const StatusBar: React.FC = () => {
  const { state } = useProject();
  return <div id="status-bar">Status Bar</div>;
};

export default StatusBar;
