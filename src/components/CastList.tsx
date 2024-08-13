import React, { useState, useEffect } from "react";
import "../styles/CastList.css";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import { useSettings } from "../contexts/SettingsContext";

const CastList: React.FC = () => {
  const { hideSettings } = useSettings();
  const { state, dispatch } = useProject();
  const { projectSaveFile } = state;

  const [cast, setCast] = useState(projectSaveFile.castList || []);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    setCast([...(projectSaveFile.castList || [])]);
  }, [projectSaveFile.castList]);

  const updateAssignment = (index: number, updatedAssignment: any) => {
    const newCast = [...cast];
    newCast[index] = updatedAssignment;
    setCast(newCast);
  };

  const saveCastList = () => {
    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { castList: cast },
    });
    dispatch({
      type: UPDATE_PROJECT_SAVE_STATUS,
      payload: false,
    });
    hideSettings();
  };

  const createNewAssignment = () => {
    setCast([
      ...cast,
      { department: "main", role: "", assignee: "", email: "" },
    ]);
  };

  const deleteAssignment = (index: number) => {
    const newCast = cast.filter((_, i) => i !== index);
    setCast(newCast);
  };

  const handleAssigneeChange = (index: number, value: string) => {
    const newCast = [...cast];
    newCast[index].assignee = value;
    setCast(newCast);

    if (value.length > 1) {
      setSuggestions(
        projectSaveFile.contactDirectory.filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (index: number, suggestion: any) => {
    const newCast = [...cast];
    newCast[index].assignee = `${suggestion.firstName} ${suggestion.lastName}`;
    newCast[index].email = suggestion.email;
    setCast(newCast);
    setSuggestions([]);
  };

  return (
    <div className="modal-background-overlay">
      <div id="cast-list-modal-window">
        <div id="cast-list-title">Cast List</div>
        <div id="cast-list-table">
          {cast.map((assignment, index) => (
            <div key={index} className="cast-entry">
              <select
                name="department"
                value={assignment.department}
                onChange={(e) =>
                  updateAssignment(index, {
                    ...assignment,
                    department: e.target.value,
                  })
                }
              >
                <option value="main">Main</option>
                <option value="understudy">Understudy</option>
              </select>
              <input
                type="text"
                name="role"
                value={assignment.role}
                onChange={(e) =>
                  updateAssignment(index, {
                    ...assignment,
                    role: e.target.value,
                  })
                }
                placeholder="Role"
              />
              <input
                type="text"
                name="assignee"
                value={assignment.assignee}
                onChange={(e) => handleAssigneeChange(index, e.target.value)}
                placeholder="Assignee"
              />
              {suggestions.map((s) => (
                <div
                  key={s.contactID}
                  onClick={() => selectSuggestion(index, s)}
                >
                  {`${s.firstName} ${s.lastName}`}
                </div>
              ))}
              <input
                type="text"
                name="email"
                value={assignment.email}
                readOnly
              />
              <button
                className="delete-button"
                onClick={() => deleteAssignment(index)}
              >
                X
              </button>
            </div>
          ))}
          <button id="add-cast-button" onClick={createNewAssignment}>
            add new assignment...
          </button>
        </div>
        <div id="cast-list-button-row">
          <button className="menu-close-button" onClick={hideSettings}>
            Close
          </button>
          <button className="menu-save-button" onClick={saveCastList}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CastList;
