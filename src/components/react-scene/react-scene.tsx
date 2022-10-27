import React from "react";
import styles from "./styles.module.css";
import SceneBuilder from "@/lib/scene-builder";
import { Object3D } from "@/types/object";
import {
  RiEdit2Line as EditingIcon,
  RiImageAddLine as AddingIcon,
} from "react-icons/ri";

type ReactSceneProps = {
  objectsMap: Record<string, Object3D>;
  isEditing: boolean;
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
      </div>
    );
  }
}

export { ReactScene as default };
