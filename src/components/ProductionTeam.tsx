import React, { useState, useEffect } from "react";
import "../styles/ProductionTeam.css";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
} from "../contexts/ProjectContext";
import { useSettings } from "../contexts/SettingsContext";

const ProductionTeam: React.FC = () => {
  const { hideSettings } = useSettings();
  const { state, dispatch } = useProject();
  const { projectSaveFile } = state;

  const [productionTeam, setProductionTeam] = useState(
    projectSaveFile.productionTeam || []
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Mapping of display names to stored values
  const departmentMapping: Record<string, string> = {
    "Select Department": "select",
    Scenic: "scenic",
    Lighting: "lighting",
    Sound: "sound",
    Costumes: "costumes",
    Props: "props",
    Director: "director",
    "Stage Manager": "stageManager",
  };

  // Reverse mapping for display purposes
  const departmentDisplayMapping = Object.fromEntries(
    Object.entries(departmentMapping).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    setProductionTeam([...(projectSaveFile.productionTeam || [])]);
  }, [projectSaveFile.productionTeam]);

  const updateAssignment = (index: number, updatedAssignment: any) => {
    const newProductionTeam = [...productionTeam];
    newProductionTeam[index] = updatedAssignment;
    setProductionTeam(newProductionTeam);
  };

  const saveProductionTeam = () => {
    // Purge entries where all fields are blank
    const cleanedProductionTeam = productionTeam.filter(
      (assignment) =>
        assignment.department !== "" ||
        assignment.assignee !== "" ||
        assignment.email !== ""
    );

    // Update department field for "Select Department" option
    const finalProductionTeam = cleanedProductionTeam.map((assignment) =>
      assignment.department === "select"
        ? { ...assignment, department: "" }
        : assignment
    );

    // Create unique list of departments
    const productionDepartments = Array.from(
      new Set(
        finalProductionTeam
          .map((assignment) => assignment.department)
          .filter((dept) => dept !== "")
      )
    );

    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { productionTeam: finalProductionTeam, productionDepartments },
    });
    dispatch({
      type: UPDATE_PROJECT_SAVE_STATUS,
      payload: false,
    });
    hideSettings();
  };

  const createNewAssignment = () => {
    setProductionTeam([
      ...productionTeam,
      { department: "select", assignee: "", email: "" },
    ]);
  };

  const deleteAssignment = (index: number) => {
    const newProductionTeam = productionTeam.filter((_, i) => i !== index);
    setProductionTeam(newProductionTeam);
  };

  const handleAssigneeChange = (index: number, value: string) => {
    const newProductionTeam = [...productionTeam];
    newProductionTeam[index].assignee = value;
    setProductionTeam(newProductionTeam);

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
    const newProductionTeam = [...productionTeam];
    newProductionTeam[
      index
    ].assignee = `${suggestion.firstName} ${suggestion.lastName}`;
    newProductionTeam[index].email = suggestion.email;
    setProductionTeam(newProductionTeam);
    setSuggestions([]);
  };

  return (
    <div className="modal-background-overlay">
      <div id="production-team-modal-window">
        <div id="production-team-title">Production Team</div>
        <div id="production-team-table">
          {productionTeam.map((assignment, index) => (
            <div key={index} className="production-team-entry">
              <select
                name="department"
                value={assignment.department || "select"}
                onChange={(e) =>
                  updateAssignment(index, {
                    ...assignment,
                    department: e.target.value,
                  })
                }
              >
                {Object.keys(departmentMapping).map((displayName) => (
                  <option
                    key={displayName}
                    value={departmentMapping[displayName]}
                  >
                    {displayName}
                  </option>
                ))}
              </select>
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
          <button id="add-assignment-button" onClick={createNewAssignment}>
            add new assignment...
          </button>
        </div>
        <div id="production-team-button-row">
          <button className="menu-close-button" onClick={hideSettings}>
            Close
          </button>
          <button className="menu-save-button" onClick={saveProductionTeam}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionTeam;
