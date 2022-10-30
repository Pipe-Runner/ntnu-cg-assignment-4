import { Object3DExtended } from "@/types/object";
import styles from "./styles.module.css";
import { IoSquareSharp as PlaneIcon } from "react-icons/io5";
import { AiTwotoneQuestionCircle as DiscIcon } from "react-icons/ai";
import { BiCube as CubeIcon, BiPyramid as PyramidIcon } from "react-icons/bi";
import { TbCone as ConeIcon } from "react-icons/tb";
import { BiCylinder as CylinderIcon } from "react-icons/bi";
import { FiDisc as TorusIcon } from "react-icons/fi";

type ObjectListProps = {
  objectsMap: Record<string, Object3DExtended>;
  onActiveObjectIdChange: (id: string | undefined) => void;
  activeObjectId: string | undefined;
};

function ObjectList({
  objectsMap,
  activeObjectId,
  onActiveObjectIdChange,
}: ObjectListProps) {
  return (
    <div className={styles.container}>
      {Object.values(objectsMap).map((object) => {
        let ShapeIcon = PlaneIcon;

        switch (object.type) {
          case "disc":
            ShapeIcon = DiscIcon;
            break;
          case "cube":
            ShapeIcon = CubeIcon;
            break;
          case "pyramid":
            ShapeIcon = PyramidIcon;
            break;
          case "cone":
            ShapeIcon = ConeIcon;
            break;
          case "cylinder":
            ShapeIcon = CylinderIcon;
            break;
          case "torus":
            ShapeIcon = TorusIcon;
            break;
          default:
            break;
        }

        return (
          <div
            onClick={() =>
              activeObjectId === object.id
                ? onActiveObjectIdChange(undefined)
                : onActiveObjectIdChange(object.id)
            }
            key={object.id}
            className={styles.itemContainer}
          >
            <div className={styles.checkBox}>
              {activeObjectId === object.id && (
                <div className={styles.checkBoxBulb} />
              )}
            </div>
            <div>{object.id}</div>
            <div style={{ flex: 1 }} />
            <ShapeIcon />
          </div>
        );
      })}
    </div>
  );
}

export default ObjectList;
