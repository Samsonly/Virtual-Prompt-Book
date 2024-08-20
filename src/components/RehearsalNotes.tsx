import React, { useState, useEffect } from "react";
import { useSettings } from "../contexts/SettingsContext";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import "../styles/RehearsalNotes.css";

const RehearsalNotes: React.FC = () => {
  const { hideSettings } = useSettings();
  const { state, dispatch } = useProject();
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

  const saveRehearsalNote = () => {
    const selectedDepartments = Object.keys(notesState).filter(
      (department) => notesState[department]
    );

    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}`;

    const rehearsalNote = {
      note: textInput,
      status: "active",
      date: formattedDate,
    };

    let updatedRehearsalNotes = projectSaveFile.rehearsalNotes;

    selectedDepartments.forEach((department) => {
      const existingDepartmentIndex = updatedRehearsalNotes.findIndex((note) =>
        note.hasOwnProperty(department)
      );

      if (existingDepartmentIndex === -1) {
        updatedRehearsalNotes.push({ [department]: [rehearsalNote] });
      } else {
        updatedRehearsalNotes[existingDepartmentIndex][department].push(
          rehearsalNote
        );
      }

      dispatch({
        type: UPDATE_PROJECT_SAVE_FILE,
        payload: { rehearsalNotes: updatedRehearsalNotes },
      });
      dispatch({ type: UPDATE_PROJECT_SAVE_STATUS, payload: false });
    });
    hideSettings();
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
            <button className="menu-save-button" onClick={saveRehearsalNote}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehearsalNotes;
