import React from "react";
import styles from "./styles.module.css";
import SceneBuilder from "@/lib/scene-builder";
import { keyboardModes, Object3D, Object3DExtended } from "@/types/object";
import {
  RiEdit2Line as EditingIcon,
  RiImageAddLine as AddingIcon,
} from "react-icons/ri";
import {
  BsKeyboard as KeyboardIcon,
  BsArrowsMove as TranslationIcon,
  BsBackspace as EscIcon,
} from "react-icons/bs";
import { MdZoomOutMap as ScaleIcon } from "react-icons/md";
import { BiRotateRight as RotationIcon } from "react-icons/bi";
import { RiIncreaseDecreaseLine as IncreaseDecreaseIcon } from "react-icons/ri";

type ReactSceneProps = {
  objectsMap: Record<string, Object3DExtended>;
  isEditing: boolean;
  kbdMode: keyboardModes;
};

/**
 * This class is just a React Wrapper for the WebGL code.
 * The webGL code is written in vanilla TS
 */
class ReactScene extends React.Component<ReactSceneProps> {
  private canvasContainer = React.createRef<HTMLDivElement>();
  private sceneBuilder: SceneBuilder | undefined;

  constructor(props: ReactSceneProps) {
    super(props);
  }

  componentDidMount(): void {
    if (this.canvasContainer.current && !this.sceneBuilder) {
      this.sceneBuilder = new SceneBuilder(this.canvasContainer.current);
      this.sceneBuilder.render();
    }
  }

  addObject(object: Object3DExtended) {
    this.sceneBuilder?.addObject(
      object.id,
      object.type,
      { x: object.posX, y: object.posY, z: object.posZ },
      { x: object.scaleX, y: object.scaleY, z: object.scaleZ },
      { x: 0, y: 0, z: object.rotationZ },
      { r: object.r, g: object.g, b: object.b }
    );
  }

  deleteObject(id: string) {
    this.sceneBuilder?.deleteObject(id);
  }

  updateObject(id: string, object: Object3D) {
    this.sceneBuilder?.updateObject(
      id,
      { x: object.posX, y: object.posY, z: object.posZ },
      { x: object.scaleX, y: object.scaleY, z: object.scaleZ },
      { x: object.rotationX, y: object.rotationY, z: object.rotationZ },
      { r: object.r, g: object.g, b: object.b }
    );
  }

  render() {
    return (
      <div ref={this.canvasContainer} className={styles.container}>
        <div className={styles.editingNotice}>
          {this.props.isEditing ? (
            <div>
              <EditingIcon /> <div>Edit Mode</div>
            </div>
          ) : (
            <div>
              <AddingIcon />
              <div>Insert Mode</div>
            </div>
          )}
        </div>
        {this.props.isEditing && (
          <div className={styles.keyboardControls}>
            <div className={styles.keyboardControlsTitle}>
              <div>
                <KeyboardIcon size={32} />
              </div>
              <div>Keyboard Controls</div>
            </div>
            {this.props.kbdMode ? (
              <div>
                <div className={styles.modeBulb}>{this.props.kbdMode}</div>
                <div className={styles.controlBlock}>
                  <div className={styles.iconContainer}>
                    <EscIcon />
                  </div>
                  <div
                    className={styles.keysContainer}
                    style={{
                      borderColor: "var(--accent)",
                    }}
                  >
                    <div>ESC</div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <div>Exit</div>
                  </div>
                </div>
                <div className={styles.controlBlock}>
                  <div className={styles.iconContainer}>
                    <IncreaseDecreaseIcon />
                  </div>
                  <div
                    className={styles.keysContainer}
                    style={{
                      borderColor: "var(--primary)",
                    }}
                  >
                    <div>I</div>
                    <div>K</div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <div>Add 0.25</div>
                    <div>Subtract 0.25</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.controlBlock}>
                  <div className={styles.iconContainer}>
                    <TranslationIcon />
                  </div>
                  <div
                    className={styles.keysContainer}
                    style={{
                      borderColor: "var(--primary)",
                    }}
                  >
                    <div>Q</div>
                    <div>W</div>
                    <div>E</div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <div>Translate X</div>
                    <div>Translate Y</div>
                    <div>Translate Z</div>
                  </div>
                </div>

                <div className={styles.controlBlock}>
                  <div className={styles.iconContainer}>
                    <ScaleIcon />
                  </div>
                  <div
                    className={styles.keysContainer}
                    style={{
                      borderColor: "var(--secondary)",
                    }}
                  >
                    <div>A</div>
                    <div>S</div>
                    <div>D</div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <div>Scale X</div>
                    <div>Scale Y</div>
                    <div>Scale Z</div>
                  </div>
                </div>

                <div className={styles.controlBlock}>
                  <div className={styles.iconContainer}>
                    <RotationIcon />
                  </div>
                  <div
                    className={styles.keysContainer}
                    style={{
                      borderColor: "var(--accent)",
                    }}
                  >
                    <div>Z</div>
                    <div>X</div>
                    <div>C</div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <div>Rotate X</div>
                    <div>Rotate Y</div>
                    <div>Rotate Z</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export { ReactScene as default };
