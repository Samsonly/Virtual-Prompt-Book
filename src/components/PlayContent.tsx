import React, { useEffect, useRef } from "react";
import LineNotes from "./LineNotes";
import {
  useProject,
  SET_SCRIPT_SCROLL_POSITION,
} from "../contexts/ProjectContext";
import { useSettings } from "../contexts/SettingsContext";

interface PlayContentProps {
  scriptJson: any; // Adjust the type as necessary
}

const PlayContent: React.FC<PlayContentProps> = ({ scriptJson }) => {
  const { state, dispatch } = useProject();
  const { scriptScrollPosition } = state;
  const playContentRef = useRef<HTMLDivElement>(null);
  const { showSettings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (playContentRef.current) {
        dispatch({
          type: SET_SCRIPT_SCROLL_POSITION,
          payload: playContentRef.current.scrollTop,
        });
      }
    };

    const playContentElement = playContentRef.current;
    playContentElement?.addEventListener("scroll", handleScroll);

    return () => {
      playContentElement?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    if (playContentRef.current) {
      playContentRef.current.scrollTop = scriptScrollPosition;
    }
  }, [scriptScrollPosition]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
      }
    };

    const playContentElement = playContentRef.current;
    playContentElement?.addEventListener("mousedown", handleMouseDown);

    return () => {
      playContentElement?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleShiftClick = (
    event: React.MouseEvent,
    characterName: string,
    dialogue: any
  ) => {
    if (event.shiftKey) {
      showSettings(LineNotes, {
        characterName: characterName.slice(0, -1),
        characterDialogue: dialogue.tagContent,
      });
    }
  };

  const formatContent = (content: string) => {
    const tagMap: { [key: string]: string } = {
      em: "em",
      i: "i",
      b: "b",
      u: "u",
    };

    const regex = new RegExp(
      Object.keys(tagMap)
        .map((tag) => `</?${tag}>`)
        .join("|"),
      "gi"
    );

    const parts = content.split(regex);
    const tags = content.match(regex) || [];
    const stack: string[] = [];

    return parts.reduce<React.ReactNode[]>((acc, part, index) => {
      if (index === 0) {
        return [<React.Fragment key={index}>{part}</React.Fragment>];
      }

      const tag = tags[index - 1];
      if (tag) {
        const tagName = tag.replace(/[<>/]/g, "").toLowerCase();

        if (tag.startsWith("</")) {
          stack.pop();
        } else {
          stack.push(tagMap[tagName]);
        }

        const CurrentComponent =
          stack.length > 0 ? stack[stack.length - 1] : React.Fragment;

        acc.push(<CurrentComponent key={index}>{part}</CurrentComponent>);
      } else {
        acc.push(<React.Fragment key={index}>{part}</React.Fragment>);
      }

      return acc;
    }, []);
  };

  return (
    <div className="playStructure" ref={playContentRef}>
      <div className="playTitle" id="playTitle">
        {scriptJson.playTitle}
      </div>
      <div className="playDescription">{scriptJson.playDescription}</div>
      <div className="actStructure">
        {scriptJson.actStructure.map((act: any, actIndex: number) => (
          <div className="act" key={actIndex}>
            <div className="actTitle" id={`actTitle${actIndex}`}>
              {act.actTitle}
            </div>
            <div className="actDescription">{act.actDescription}</div>

            <div className="sceneStructure">
              {act.sceneStructure.map((scene: any, sceneIndex: number) => (
                <div className="scene" key={sceneIndex}>
                  <div
                    className="sceneTitle"
                    id={`sceneTitle${actIndex}${sceneIndex}`}
                  >
                    {scene.sceneTitle}
                  </div>
                  <div className="sceneLocation">{scene.sceneLocation}</div>
                  <div className="sceneDescription">
                    {scene.sceneDescription}
                  </div>

                  <div className="internalSceneStructure">
                    {scene.internalSceneStructure.map(
                      (content: any, contentIndex: number) => (
                        <div
                          key={contentIndex}
                          className={
                            content.stgdContent
                              ? "stgdContent"
                              : content.characterContent
                              ? "characterContent"
                              : ""
                          }
                        >
                          {content.stgdContent &&
                            content.stgdContent.map(
                              (item: any, itemIndex: number) => (
                                <div
                                  key={itemIndex}
                                  className="stageDirections"
                                >
                                  {formatContent(item.tagContent)}
                                </div>
                              )
                            )}
                          {content.characterContent && (
                            <>
                              <div
                                className={`characterName ${content.characterContent.characterName
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                                  .slice(0, -1)}`}
                                key={contentIndex}
                              >
                                {content.characterContent.characterName}
                              </div>
                              {content.characterContent.characterAction.map(
                                (action: any, actionIndex: number) => (
                                  <div
                                    key={actionIndex}
                                    className={
                                      action.tagType === "d"
                                        ? "characterDialogue"
                                        : "characterDirection"
                                    }
                                    onClick={(e) =>
                                      handleShiftClick(
                                        e,
                                        content.characterContent.characterName,
                                        action
                                      )
                                    }
                                  >
                                    {formatContent(action.tagContent)}
                                  </div>
                                )
                              )}
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <div className="sceneEnding">{scene.sceneEnding}</div>
                </div>
              ))}
            </div>

            <div className="actEnding">{act.actEnding}</div>
          </div>
        ))}
      </div>

      <div className="playEnding">{scriptJson.playEnding}</div>
    </div>
  );
};

export default PlayContent;
