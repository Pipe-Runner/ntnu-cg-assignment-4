import { Object3D } from "@/types/object";
import styles from "./styles.module.css";

type ObjectListProps = {
  objectsMap: Record<string, Object3D>;
  onSelectedObjectIDChange: (id: string | undefined) => void;
  selectedObjectID: string | undefined;
};

function ObjectList({
  objectsMap,
  selectedObjectID,
  onSelectedObjectIDChange,
}: ObjectListProps) {
  return (
    <div className={styles.container}>
      {Object.values(objectsMap).map((object) => (
        <div
          onClick={() =>
            selectedObjectID === object.id
              ? onSelectedObjectIDChange(undefined)
              : onSelectedObjectIDChange(object.id)
          }
          key={object.id}
          className={styles.itemContainer}
        >
          <div className={styles.checkBox}>
            {selectedObjectID === object.id && (
              <div className={styles.checkBoxBulb} />
            )}
          </div>
          <div>{object.id}</div>
        </div>
      ))}
    </div>
  );
}

export default ObjectList;
