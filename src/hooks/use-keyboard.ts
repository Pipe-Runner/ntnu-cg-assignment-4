import { keyboardModes, Object3D } from "@/types/object";
import { useEffect } from "react";

const useKeyboard = (
  deps: [
    isActive: string | undefined,
    kbdMode: keyboardModes,
    input: Object3D,
    updateInputViaKbd: (key: string, update: number) => void
  ],
  onChangeKbdMode: (mode: keyboardModes) => void,
  onChangeKbdValue: (mode: string, value: number) => void
) => {
  const [isActive, kbdMode] = deps;

  useEffect(() => {
    const kbdEventHandler = (e: KeyboardEvent) => {
      if (!isActive) {
        return;
      }

      switch (e.code) {
        case "KeyQ":
          !kbdMode && onChangeKbdMode("posX");
          break;
        case "KeyW":
          !kbdMode && onChangeKbdMode("posY");
          break;
        case "KeyE":
          !kbdMode && onChangeKbdMode("posZ");
          break;
        case "KeyA":
          !kbdMode && onChangeKbdMode("scaleX");
          break;
        case "KeyS":
          !kbdMode && onChangeKbdMode("scaleY");
          break;
        case "KeyD":
          !kbdMode && onChangeKbdMode("scaleZ");
          break;
        case "KeyZ":
          !kbdMode && onChangeKbdMode("rotationX");
          break;
        case "KeyX":
          !kbdMode && onChangeKbdMode("rotationY");
          break;
        case "KeyC":
          !kbdMode && onChangeKbdMode("rotationZ");
          break;
        case "Escape":
          kbdMode && onChangeKbdMode(undefined);
          break;
        case "KeyI":
          kbdMode && onChangeKbdValue(kbdMode, +0.25);
          break;
        case "KeyK":
          kbdMode && onChangeKbdValue(kbdMode, -0.25);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", kbdEventHandler);

    return () => {
      window.removeEventListener("keydown", kbdEventHandler);
    };
  }, deps);
};

export { useKeyboard };
