import React, { useState } from "react";
import "../styles/ViewLineNotes.css";
import { useSettings } from "../contexts/SettingsContext";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
} from "../contexts/ProjectContext";
import exportLineNotesUtil from "../utils/exportLineNotesUtil";
import EditLineNote from "./EditLineNote";
import CustomConfirm from "../containers/CustomConfirm";

interface LineNote {
  line: { text: string; format: string }[];
  error: string[];
  status: "active" | "archived";
  date: string;
}

interface CharacterNotes {
  [character: string]: LineNote[];
}

const ViewLineNotes: React.FC = () => {
  const { hideSettings, showSettings } = useSettings();
  const { state, dispatch } = useProject();
  const { projectSaveFile } = state;
  const storedLineNotes = projectSaveFile.lineNotes as CharacterNotes[];
  const [includeArchived, setIncludeArchived] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<{
    character: string;
    noteIndex: number;
  } | null>(null);

  const formatLineText = (line: { text: string; format: string }[]) => {
    return line.map((word, index) => {
      let formattedText;
      if (word.format === "dropped") {
        formattedText = (
          <span key={index} className="droppedWords">
            {word.text}
          </span>
        );
      } else if (word.format === "added") {
        formattedText = (
          <span key={index} className="addedWords">
            {word.text}
          </span>
        );
      } else {
        formattedText = <span key={index}>{word.text}</span>;
      }

      return (
        <React.Fragment key={index}>
          {formattedText}
          {index < line.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  const renderCharacterTabs = () => {
    if (!storedLineNotes || storedLineNotes.length === 0)
      return <div>No line notes available.</div>;
    return storedLineNotes.map((note, index) => {
      const character = Object.keys(note)[0];
      return (
        <button
          key={character}
          className={`character-tab ${
            activeCharacter === character ? "active-tab" : ""
          }`}
          onClick={() => setActiveCharacter(character)}
        >
          {character}
        </button>
      );
    });
  };

  const renderNotesForCharacter = () => {
    if (!activeCharacter) return <div>Select a character to view notes.</div>;
    const characterNotes = storedLineNotes.find((note) =>
      note.hasOwnProperty(activeCharacter)
    );
    if (!characterNotes) return <div>No notes found for this character.</div>;

    return characterNotes[activeCharacter]
      .filter((note: LineNote) => includeArchived || note.status === "active")
      .map((note: LineNote, noteIndex: number) => (
        <div
          key={noteIndex}
          className={`note-entry ${
            note.status === "archived" ? "archived-note" : ""
          }`}
          onMouseLeave={() => setActiveNote(null)}
        >
          <div className="note-errors">{note.error.join(", ")}</div>
          <div className="note-line">{formatLineText(note.line)}</div>
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
                      showSettings(EditLineNote, {
                        activeCharacter,
                        noteIndex,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleToggleArchiveNote(activeCharacter, noteIndex)
                    }
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => {
                      setNoteToDelete({
                        character: activeCharacter,
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
                      handleToggleArchiveNote(activeCharacter, noteIndex)
                    }
                  >
                    Unarchive
                  </button>
                  <button
                    onClick={() => {
                      setNoteToDelete({
                        character: activeCharacter,
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
    if (activeCharacter) {
      const characterNotesObj = storedLineNotes.find((note) =>
        note.hasOwnProperty(activeCharacter)
      );

      if (!characterNotesObj) {
        alert("No notes found for the selected character.");
        return;
      }

      const characterNotes = characterNotesObj[activeCharacter];

      const activeNotes = characterNotes.filter(
        (note: LineNote) => note.status === "active"
      );

      if (activeNotes.length === 0) {
        alert("No active notes to export for the selected character.");
        return;
      }

      const activeNotesObj = { [activeCharacter]: activeNotes };

      const doc = exportLineNotesUtil([activeNotesObj], activeCharacter);
      doc.save(`${activeCharacter}_line_notes.pdf`);
    } else {
      alert("Please select a character to export notes for.");
    }
  };

  const handleToggleArchiveNote = (character: string, noteIndex: number) => {
    const updatedLineNotes = storedLineNotes.map((note) => {
      if (note[character]) {
        const updatedCharacterNotes = note[character].map(
          (lineNote: LineNote, index: number) => {
            if (index === noteIndex) {
              return {
                ...lineNote,
                status: lineNote.status === "active" ? "archived" : "active",
              };
            }
            return lineNote;
          }
        );
        return { [character]: updatedCharacterNotes };
      }
      return note;
    });

    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { lineNotes: updatedLineNotes },
    });

    setActiveNote(null);
  };

  const handleDeleteNote = (character: string, noteIndex: number) => {
    const updatedLineNotes = storedLineNotes.map((note) => {
      if (note[character]) {
        const updatedCharacterNotes = note[character].filter(
          (_: LineNote, index: number) => index !== noteIndex
        );
        return { [character]: updatedCharacterNotes };
      }
      return note;
    });

    dispatch({
      type: UPDATE_PROJECT_SAVE_FILE,
      payload: { lineNotes: updatedLineNotes },
    });

    setActiveNote(null);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      handleDeleteNote(noteToDelete.character, noteToDelete.noteIndex);
    }
  };

  return (
    <div className="modal-background-overlay">
      <div className="modal-window">
        <div id="view-line-notes-table">
          <div id="view-line-notes-title">
            View Line Notes
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
          <div id="view-line-notes-tabs">{renderCharacterTabs()}</div>
          <div id="view-line-notes-content">{renderNotesForCharacter()}</div>
          <div id="view-line-notes-button-row">
            <button className="menu-close-button" onClick={hideSettings}>
              Close
            </button>
            <button className="menu-export-button" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <CustomConfirm
          message="Are you sure you want to delete this line note?"
          onNo={() => setShowConfirmModal(false)}
          onYes={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ViewLineNotes;
