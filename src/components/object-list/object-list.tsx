import { Object3DExtended } from "@/types/object";
import styles from "./styles.module.css";

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
      {Object.values(objectsMap).map((object) => (
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
        </div>
      ))}
    </div>
  );
}

export default ObjectList;
