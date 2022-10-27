import { useEffect, useRef, useState } from "react";
import { keyboardModes, Object3D, ObjectTypes } from "./@types/object";
import styles from "./App.module.css";
import ReactScene from "./components/react-scene";
import SettingsPanel from "./components/settings-panel";
import {
  initialColor,
  initialPosition,
  initialRotation,
  initialScale,
} from "./lib/constants/initial-values";

function App() {
  const reactScene = useRef<ReactScene>(null);
  const [kbdMode, setKbdMode] = useState<keyboardModes>(undefined);

  const [objectsMap, setObjectMap] = useState<Record<string, Object3D>>({});
  const [selectedObjectID, setSelectedObjectID] = useState<string | undefined>(
    undefined
  );
  const [input, setInput] = useState(
    JSON.parse(
      JSON.stringify({
        position: initialPosition,
        scale: initialScale,
        rotation: initialRotation,
        color: initialColor,
      })
    )
  );

  useEffect(() => {
    const keybrdEventHandler = (e: KeyboardEvent) => {
      if (!selectedObjectID) {
        return;
      }

      switch (e.code) {
        case "KeyQ":
          !kbdMode && setKbdMode("pos-x");
          break;
        case "KeyW":
          !kbdMode && setKbdMode("pos-y");
          break;
        case "KeyE":
          !kbdMode && setKbdMode("pos-z");
          break;
        case "KeyA":
          !kbdMode && setKbdMode("scale-x");
          break;
        case "KeyS":
          !kbdMode && setKbdMode("scale-y");
          break;
        case "KeyD":
          !kbdMode && setKbdMode("scale-z");
          break;
        case "KeyZ":
          !kbdMode && setKbdMode("rot-z");
        case "Escape":
          kbdMode && setKbdMode(undefined);
          break;
        case "KeyI":
          kbdMode && updateInputViaKbd(kbdMode, +0.25);
          break;
        case "KeyK":
          kbdMode && updateInputViaKbd(kbdMode, -0.25);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", keybrdEventHandler);

    return () => {
      window.removeEventListener("keydown", keybrdEventHandler);
    };
  }, [selectedObjectID, kbdMode]);

  useEffect(() => {
    if (selectedObjectID === undefined) {
      resetInput();
      kbdMode && setKbdMode(undefined);
    } else {
      setInput({
        position: objectsMap[selectedObjectID].position,
        scale: objectsMap[selectedObjectID].scale,
        rotation: objectsMap[selectedObjectID].rotation,
        color: objectsMap[selectedObjectID].color,
      });
    }
  }, [selectedObjectID]);

  useEffect(() => {
    // TODO: Fix redundant re-rendering during checkbox toggle
    if (selectedObjectID) {
      onUpdateObject(selectedObjectID, input);
    }
  }, [input]);

  const updateInputViaKbd = (key: string, update: number) => {
    
  };

  const resetInput = () => {
    setInput(
      JSON.parse(
        JSON.stringify({
          position: initialPosition,
          scale: initialScale,
          rotation: initialRotation,
          color: initialColor,
        })
      )
    );
  };

  const onAddObject = (type: ObjectTypes) => {
    const id = Math.random().toString(36).substring(7);

    /**
     * creating deep copy of the object state to avoid overriding the initial values
     */
    setObjectMap({
      ...objectsMap,
      [id]: JSON.parse(
        JSON.stringify({
          id,
          type,
          isPositionDirty: false,
          isScaleDirty: false,
          isRotationDirty: false,
          isColorDirty: false,
          history: JSON.parse(JSON.stringify(input)),
          ...input,
        })
      ),
    });

    /**
     * Reset input after adding
     */
    resetInput();
  };

  const onRemoveObject = (id: string) => {
    const newObjectsMap = Object.entries(objectsMap).reduce(
      (acc, [key, value]) => {
        if (key !== id) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, Object3D>
    );
    setObjectMap(newObjectsMap);
    setSelectedObjectID(undefined);
  };

  const onResetObject = (
    id: string,
    type: "all" | "rotation" | "color" | "scale" | "position" = "all"
  ) => {
    const historyCopy = JSON.parse(JSON.stringify(objectsMap[id].history));

    switch (type) {
      case "all":
        onUpdateObject(id, {
          isColorDirty: false,
          isPositionDirty: false,
          isScaleDirty: false,
          isRotationDirty: false,
          ...historyCopy,
        });

        /**
         * Since we are updating the object state, we need to update the input state as well
         * This might cause a double update, but it's fine for now
         */
        setInput({
          position: historyCopy.position,
          scale: historyCopy.scale,
          rotation: historyCopy.rotation,
          color: historyCopy.color,
        });
        break;
      case "color":
        onUpdateObject(id, {
          ...objectsMap[id],
          isColorDirty: false,
          color: historyCopy.color,
        });

        setInput({
          ...input,
          color: historyCopy.color,
        });
        break;
      case "position":
        onUpdateObject(id, {
          ...objectsMap[id],
          isPositionDirty: false,
          position: historyCopy.position,
        });

        setInput({
          ...input,
          position: historyCopy.position,
        });
        break;
      case "rotation":
        onUpdateObject(id, {
          ...objectsMap[id],
          isRotationDirty: false,
          rotation: historyCopy.rotation,
        });

        setInput({
          ...input,
          rotation: historyCopy.rotation,
        });
        break;
      case "scale":
        onUpdateObject(id, {
          ...objectsMap[id],
          isScaleDirty: false,
          scale: historyCopy.scale,
        });

        setInput({
          ...input,
          scale: historyCopy.scale,
        });
        break;
      default:
        break;
    }
  };

  const onUpdateObject = (id: string, newState: Object3D) => {
    setObjectMap({
      ...objectsMap,
      [id]: { ...objectsMap[id], ...newState },
    });

    reactScene.current?.updateObject(id, newState);
  };

  return (
    <div className={styles.app}>
      <div className={styles.flexContainer}>
        <div className={styles.sceneWrapper}>
          <ReactScene
            isEditing={!!selectedObjectID}
            ref={reactScene}
            objectsMap={objectsMap}
            kbdMode={kbdMode}
          />
        </div>
        <div className={styles.panelWrapper}>
          <SettingsPanel
            input={input}
            setInput={setInput}
            onClickAdd={onAddObject}
            onClickRemove={onRemoveObject}
            objectsMap={objectsMap}
            selectedObjectID={selectedObjectID}
            onSelectedObjectIDChange={setSelectedObjectID}
            onClickReset={onResetObject}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
