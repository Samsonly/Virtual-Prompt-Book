import React from "react";
import {
  useProject,
  UPDATE_PROJECT_SAVE_FILE,
  UPDATE_PROJECT_SAVE_STATUS,
  SET_CURRENT_SCRIPT_VIEW,
} from "../contexts/ProjectContext";

const UploadScript: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { dispatch } = useProject();

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          const characters = createUniqueCharacterList(jsonData.actStructure);
          const initialCastList = createInitialCastList(characters);

          dispatch({
            type: UPDATE_PROJECT_SAVE_FILE,
            payload: {
              script: jsonData,
              characterList: characters,
              castList: initialCastList,
            },
          });
          dispatch({ type: UPDATE_PROJECT_SAVE_STATUS, payload: false });
          dispatch({ type: SET_CURRENT_SCRIPT_VIEW, payload: "script" });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const uploadScript = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileChange as EventListener);
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const createUniqueCharacterList = (data: any[]): any[] => {
    const names = new Set<string>();
    const extractCharacterNames = (data: any[]) => {
      data.forEach((item) => {
        if (item.characterContent && item.characterContent.characterName) {
          names.add(
            item.characterContent.characterName.trim().replace(/\.$/, "")
          );
        } else if (item.internalSceneStructure) {
          extractCharacterNames(item.internalSceneStructure);
        } else if (item.sceneStructure) {
          item.sceneStructure.forEach((scene: any) => {
            extractCharacterNames(scene.internalSceneStructure);
          });
        }
      });
    };

    extractCharacterNames(data);

    return Array.from(names).map((name) => ({
      characterName: name,
      mainActor: [{ actorID: "", actorName: "", actorEmail: "" }],
      understudy: [{ actorID: "", actorName: "", actorEmail: "" }],
    }));
  };

  const createInitialCastList = (characters: any[]): any[] => {
    return characters.map((character) => ({
      department: "cast",
      role: character.characterName,
      assignee: "",
      email: "",
    }));
  };

  return <div onClick={uploadScript}>{children}</div>;
};

export default UploadScript;
