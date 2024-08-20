import React, { useState } from "react";
import "../styles/ViewRehearsalNotes.css";
import { useSettings } from "../contexts/SettingsContext";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
} from "../contexts/ProjectContext";
import exportRehearsalNotesUtil from "../utils/exportRehearsalNotesUtil";
import EditRehearsalNote from "./EditRehearsalNote";
import CustomConfirm from "../containers/CustomConfirm";

interface RehearsalNote {
  note: string;
  status?: string;
  date: string;
}

interface DepartmentNotes {
  [department: string]: RehearsalNote[];
}

const ViewRehearsalNotes: React.FC = () => {
  const { hideSettings, showSettings } = useSettings();
  const { state, dispatch } = useProject();
  const { projectSaveFile } = state;
  const storedRehearsalNotes =
    projectSaveFile.rehearsalNotes as DepartmentNotes[];
  const [includeArchived, setIncludeArchived] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<{
    department: string;
    noteIndex: number;
  } | null>(null);

  const renderDepartmentTabs = () => {
    if (!storedRehearsalNotes || storedRehearsalNotes.length === 0)
      return <div>No rehearsal notes to display</div>;
    return storedRehearsalNotes.map((note) => {
      const department = Object.keys(note)[0];
      return (
        <button
          key={department}
          className={`department-tab ${
            activeDepartment === activeDepartment ? "active-tab" : ""
          }`}
          onClick={() => setActiveDepartment(department)}
        >
          {department}
        </button>
      );
    });
  };

  const renderNotesForDepartment = () => {
    if (!activeDepartment) return <div>Select a department to view notes</div>;
    const departmentNotes = storedRehearsalNotes.find((note) =>
      note.hasOwnProperty(activeDepartment)
    );
    if (!departmentNotes) return <div>No notes found for this department.</div>;

    return departmentNotes[activeDepartment]
      .filter(
        (note: RehearsalNote) => includeArchived || note.status === "active"
      )
      .map((note: RehearsalNote, noteIndex: number) => (
        <div
          key={noteIndex}
          className={`note-entry ${
            note.status === "archived" ? "archived-note" : ""
          }`}
          onMouseLeave={() => setActiveNote(null)}
        >
          <div className="note-text">{note.note}</div>
          <button
            className="menu-button"
            onClick={() => setActiveNote(noteIndex)}
          >
            ...
          </button>
          {activeNote === noteIndex && (
            <div className="dropdown-menu active">
              {note.status === "active" ? (
                <>
                  <button
                    onClick={() => {
                      showSettings(EditRehearsalNote, {
                        activeDepartment,
                        noteIndex,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleToggleArchiveNote(activeDepartment, noteIndex)
                    }
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => {
                      setNoteToDelete({
                        department: activeDepartment,
                        noteIndex,
                      });
                      setShowConfirmModal(true);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleToggleArchiveNote(activeDepartment, noteIndex)
                    }
                  >
                    Unarchive
                  </button>
                  <button
                    onClick={() => {
                      setNoteToDelete({
                        department: activeDepartment,
                        noteIndex,
                      });
                      setShowConfirmModal(true);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ));
  };
  const handleExport = () => {
    if (activeDepartment) {
      const departmentNotesObj = storedRehearsalNotes.find((note) =>
        note.hasOwnProperty(activeDepartment)
      );

      if (!departmentNotesObj) {
        alert("No notes found for the selected department.");
        return;
      }

      const departmentNotes = departmentNotesObj[activeDepartment];

      const activeNotes = departmentNotes.filter(
        (note: RehearsalNote) => note.status === "active"
      );

      if (activeNotes.length === 0) {
        alert("No active notes to export for the selected department.");
        return;
      }

      const activeNotesObj = { [activeDepartment]: activeNotes };

      const doc = exportRehearsalNotesUtil([activeNotesObj], activeDepartment);
      doc.save(`${activeDepartment}_rehearsal_notes.pdf`);
    } else {
      alert("Please select a department to export notes for.");
    }
  };

  const handleToggleArchiveNote = (department: string, noteIndex: number) => {
    const updatedRehearsalNotes = storedRehearsalNotes.map((note) => {
      if (note[department]) {
        const updatedDepartmentNotes = note[department].map(
          (rehearsalNote: RehearsalNote, index: number) => {
            if (index === noteIndex) {
              return {
                ...rehearsalNote,
                status:
                  rehearsalNote.status === "active" ? "archived" : "active",
              };
            }
            return rehearsalNote;
          }
        );
        return { [department]: updatedDepartmentNotes };
      }
      return note;
    });

    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { rehearsalNotes: updatedRehearsalNotes },
    });

    setActiveNote(null);
  };

  const handleDeleteNote = (department: string, noteIndex: number) => {
    const updatedRehearsalNotes = storedRehearsalNotes.map((note) => {
      if (note[department]) {
        const updatedDepartmentNotes = note[department].filter(
          (_: RehearsalNote, index: number) => index !== noteIndex
        );
        return { [department]: updatedDepartmentNotes };
      }
      return note;
    });

    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { rehearsalNotes: updatedRehearsalNotes },
    });

    setActiveNote(null);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      handleDeleteNote(noteToDelete.department, noteToDelete.noteIndex);
    }
  };

  const handleRehearsalReport = () => {
    // Placeholder function for generating the rehearsal report
    console.log("Generate Rehearsal Report functionality triggered.");
    // Implement the actual report generation logic here
  };

  return (
    <div className="modal-background-overlay">
      <div className="modal-window">
        <div id="view-rehearsal-notes-table">
          <div id="view-rehearsal-notes-title">
            View Rehearsal Notes
            <div className="include-archived-container">
              <input
                type="checkbox"
                id="include-archived"
                className="include-archived-checkbox"
                checked={includeArchived}
                onChange={() => setIncludeArchived(!includeArchived)}
              />
              <label
                htmlFor="include-archived"
                className="include-archived-label"
              >
                Include Archived
              </label>
            </div>{" "}
          </div>{" "}
          <div id="view-rehearsal-notes-tabs">{renderDepartmentTabs()}</div>
          <div id="view-rehearsal-notes-content">
            {renderNotesForDepartment()}
          </div>
          <div id="view-rehearsal-notes-button-row">
            <button className="menu-close-button" onClick={hideSettings}>
              Close
            </button>
            <button
              className="menu-export-department-button"
              onClick={handleExport}
            >
              Export Selected Department Notes
            </button>
            <button
              className="menu-generate-report-button"
              onClick={handleRehearsalReport}
            >
              Generate Rehearsal Report
            </button>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <CustomConfirm
          message="Are you sure you want to delete this rehearsal note?"
          onNo={() => setShowConfirmModal(false)}
          onYes={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ViewRehearsalNotes;
