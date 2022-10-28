import { useEffect, useRef, useState } from "react";
import {
  keyboardModes,
  Object3D,
  Object3DExtended,
  ObjectTypes,
  ResetType,
} from "./@types/object";
import styles from "./App.module.css";
import ReactScene from "./components/react-scene";
import sceneRef from "./components/react-scene";
import SettingsPanel from "./components/settings-panel";
import { useKeyboard } from "./hooks/use-keyboard";
import { initialState } from "./lib/constants/initial-values";

function App() {
  const sceneRef = useRef<sceneRef>(null);
  const [kbdMode, setKbdMode] = useState<keyboardModes>(undefined);

  const [objectsMap, setObjectMap] = useState<Record<string, Object3DExtended>>(
    {}
  );
  const [activeObjectId, setActiveObjectId] = useState<string | undefined>(
    undefined
  );
  const [input, setInput] = useState<Object3D>({ ...initialState });

  useEffect(() => {
    if (activeObjectId === undefined) {
      /**
       * Reset input and keyboard mode if nothing is selected
       */
      resetInput();
      kbdMode && setKbdMode(undefined);
    } else {
      /**
       * Set input values to selected object
       */
      setInput({
        ...objectsMap[activeObjectId],
      });
    }
  }, [activeObjectId]);

  /**
   * Update active object if input changes
   */
  useEffect(() => {
    if (activeObjectId) {
      onUpdateObject(activeObjectId, {
        ...objectsMap[activeObjectId],
        ...input,
      });
    }
  }, [input]);

  const updateInputViaKbd = (key: string, update: number) => {
    const inputKey = key as keyof Object3D;

    const newInput = {
      ...input,
      [inputKey]: (input[inputKey] as number) + update,
    };
    if (inputKey.startsWith("pos")) {
      newInput.isPositionDirty = true;
    }
    if (inputKey.startsWith("scale")) {
      newInput.isScaleDirty = true;
    }
    if (inputKey.startsWith("rotation")) {
      newInput.isRotationDirty = true;
    }

    setInput(newInput);
  };

  /**
   * Handle keyboard events
   */
  useKeyboard(
    [activeObjectId, kbdMode, input, updateInputViaKbd],
    setKbdMode,
    updateInputViaKbd
  );

  const resetInput = () => {
    setInput({ ...initialState });
  };

  const onAddObject = (type: ObjectTypes) => {
    const id = Math.random().toString(36).substring(7);

    /**
     * creating deep copy of the object state to avoid overriding the initial values
     */
    const newObject = JSON.parse(
      JSON.stringify({
        id,
        type,
        history: JSON.parse(JSON.stringify(input)), // making a deep copy of initial state
        ...input,
      })
    );
    setObjectMap({
      ...objectsMap,
      [id]: newObject,
    });

    sceneRef.current?.addObject(newObject);

    /**
     * Reset input after adding
     */
    resetInput();
  };

  const onRemoveObject = (id: string) => {
    sceneRef.current?.deleteObject(id);

    const newObjectsMap = Object.entries(objectsMap).reduce(
      (acc, [key, value]) => {
        if (key !== id) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, Object3DExtended>
    );
    setObjectMap(newObjectsMap);
    setActiveObjectId(undefined);
  };

  /**
   * Since reset can only happen if an object is active,
   * we can only update the input and the useEffect defined above will take care of updating the object
   */
  const onResetObject = (id: string, type: ResetType = "all") => {
    const historyCopy = { ...objectsMap[id].history };

    switch (type) {
      case "all":
        setInput({
          ...historyCopy,
        });
        break;
      case "color":
        setInput({
          ...input,
          r: historyCopy.r,
          g: historyCopy.g,
          b: historyCopy.b,
          isColorDirty: false,
        });
        break;
      case "position":
        setInput({
          ...input,
          posX: historyCopy.posX,
          posY: historyCopy.posY,
          posZ: historyCopy.posZ,
          isPositionDirty: false,
        });
        break;
      case "scale":
        setInput({
          ...input,
          scaleX: historyCopy.scaleX,
          scaleY: historyCopy.scaleY,
          scaleZ: historyCopy.scaleZ,
          isScaleDirty: false,
        });
        break;
      case "rotation":
        setInput({
          ...input,
          rotationX: historyCopy.rotationX,
          rotationY: historyCopy.rotationY,
          rotationZ: historyCopy.rotationZ,
          isRotationDirty: false,
        });
        break;
      default:
        break;
    }
  };

  const onUpdateObject = (id: string, newState: Object3DExtended) => {
    setObjectMap({
      ...objectsMap,
      [id]: newState,
    });

    sceneRef.current?.updateObject(id, newState);
  };

  return (
    <div className={styles.app}>
      <div className={styles.flexContainer}>
        <div className={styles.sceneWrapper}>
          <ReactScene
            isEditing={!!activeObjectId}
            ref={sceneRef}
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
            activeObjectId={activeObjectId}
            onActiveObjectIdChange={setActiveObjectId}
            onClickReset={onResetObject}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
