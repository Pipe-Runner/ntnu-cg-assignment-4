import React from "react";
import styles from "./styles.module.css";
import SceneBuilder from "@/lib/scene-builder";
import { keyboardModes, Object3D } from "@/types/object";
import {
  RiEdit2Line as EditingIcon,
  RiImageAddLine as AddingIcon,
} from "react-icons/ri";

type ReactSceneProps = {
  objectsMap: Record<string, Object3D>;
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

  componentDidUpdate(prevProps: ReactSceneProps) {
    // Object added
    if (
      Object.keys(this.props.objectsMap).length >
      Object.keys(prevProps.objectsMap).length
    ) {
      const newObject = Object.values(this.props.objectsMap).find(
        (object) => !prevProps.objectsMap[object.id]
      );

      if (newObject) {
        this.sceneBuilder?.addObject(
          newObject.id,
          newObject.type,
          newObject.position,
          newObject.scale,
          newObject.rotation,
          newObject.color
        );
      }

      return;
    }

    // Object deleted
    if (
      Object.keys(this.props.objectsMap).length <
      Object.keys(prevProps.objectsMap).length
    ) {
      const deletedObject = Object.values(prevProps.objectsMap).find(
        (object) => !this.props.objectsMap[object.id]
      );

      if (deletedObject) {
        this.sceneBuilder?.deleteObject(deletedObject.id);
      }

      return;
    }
  }

  updateObject(id: string, object: Object3D) {
    this.sceneBuilder?.updateObject(
      id,
      object.position,
      object.scale,
      object.rotation,
      object.color
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
            {this.props.kbdMode ? (
              <div>
                <div>Esc - Exit keyboard edit mode</div>
                <div>I - Increase</div>
                <div>K - Decrease</div>
                <div>Active mode: {this.props.kbdMode}</div>
              </div>
            ) : (
              <div>
                <div>Q - Position-X</div>
                <div>W - Position-Y</div>
                <div>E - Position-Z</div>
                <br />
                <div>A - Scale-X</div>
                <div>S - Scale-Y</div>
                <div>D - Scale-Z</div>
                <br />
                <div>Z - Scale-Z</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export { ReactScene as default };
