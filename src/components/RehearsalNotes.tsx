import React, { useState, useEffect } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useProject } from "../contexts/ProjectContext";
import "../styles/RehearsalNotes.css";

const RehearsalNotes: React.FC = () => {
  const { hideSettings } = useSettings();
  const { state } = useProject();
  const { projectSaveFile } = state;

  const [notesState, setNotesState] = useState<Record<string, boolean>>({});
  const [textInput, setTextInput] = useState("");

  // Initialize state for each department dynamically, including "general"
  useEffect(() => {
    const initialState = {
      general: false,
      ...projectSaveFile.productionDepartments.reduce(
        (acc: Record<string, boolean>, department: string) => {
          acc[department] = false;
          return acc;
        },
        {}
      ),
    };
    setNotesState(initialState);
  }, [projectSaveFile.productionDepartments]);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleCheckboxChange = (department: string) => {
    setNotesState((prevState) => ({
      ...prevState,
      [department]: !prevState[department],
    }));
  };

  const formatDepartmentName = (department: string) => {
    return department
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const renderCheckboxes = () => {
    return Object.keys(notesState).map((department) => (
      <div key={department} className="checkbox-wrapper">
        <input
          type="checkbox"
          id={`${department}-notes`}
          name={`${department}-notes`}
          checked={notesState[department]}
          onChange={() => handleCheckboxChange(department)}
        />
        <label htmlFor={`${department}-notes`}>
          {formatDepartmentName(department)}
        </label>
      </div>
    ));
  };

  return (
    <div className="modal-background-overlay">
      <div id="rehearsal-notes-modal-window">
        <div id="rehearsal-notes-table">
          <div id="rehearsal-notes-title">Rehearsal Note</div>
          <div id="rehearsal-notes-departments-box">
            <div className="rehearsal-notes-departments-row">
              {renderCheckboxes()}
            </div>
          </div>
          <div id="rehearsal-notes-input-container">
            <textarea
              id="rehearsal-notes-input"
              value={textInput}
              onChange={handleTextInputChange}
              autoFocus
            />
          </div>
          <div id="rehearsal-notes-button-row">
            <button className="menu-close-button" onClick={hideSettings}>
              Close
            </button>
            <button
              className="menu-save-button"
              onClick={() => console.log("Save logic here")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehearsalNotes;
