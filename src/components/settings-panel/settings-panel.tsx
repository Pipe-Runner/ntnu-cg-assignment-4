import Button from "../button";
import Input from "../input";
import styles from "./styles.module.css";
import Select from "../select";

import { SketchPicker } from "react-color";
import Tippy from "@tippyjs/react";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import ColorBlock from "../color-block";
import ObjectList from "../object-list/object-list";
import { Object3D, ObjectTypes } from "@/types/object";
import { useState } from "react";
import Tooltip from "../tooltip";

type SettingsPanelProps = {
  onClickAdd: (type: ObjectTypes) => void;
  onClickRemove: (id: string) => void;
  objectsMap: Record<string, Object3D>;
  onSelectedObjectIDChange: (id: string | undefined) => void;
  selectedObjectID: string | undefined;
  input: any;
  setInput: (arg: any) => void;
  onClickReset: (
    id: string,
    type: "all" | "rotation" | "color" | "scale" | "position"
  ) => void;
};

const OPTIONS: { label: string; value: ObjectTypes }[] = [
  { label: "Quad", value: "quad" },
  { label: "Cube", value: "cube" },
];

function SettingsPanel({
  onClickAdd,
  onClickRemove,
  objectsMap,
  onSelectedObjectIDChange,
  selectedObjectID,
  input,
  setInput,
  onClickReset,
}: SettingsPanelProps) {
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: ObjectTypes;
  }>(OPTIONS[0]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SettingsIcon />
        <div>CONTROL PANEL</div>
      </div>
      <div className={styles.wrapper} style={{ marginBottom: 12 }}>
        <Select options={OPTIONS} value={selectValue} />
      </div>
      <div className={styles.wrapper}>
        <Input
          helperText="position-x"
          value={input.position.x}
          onChange={(value: any) => {
            setInput({
              ...input,
              position: { ...input.position, x: value },
            });

            if (selectedObjectID)
              objectsMap[selectedObjectID].isPositionDirty = true;
          }}
        />
        <Input
          helperText="position-y"
          value={input.position.y}
          onChange={(value: any) => {
            setInput({
              ...input,
              position: { ...input.position, y: value },
            });

            if (selectedObjectID)
              objectsMap[selectedObjectID].isPositionDirty = true;
          }}
        />
        <Input
          helperText="position-z"
          value={input.position.z}
          onChange={(value: any) => {
            setInput({
              ...input,
              position: { ...input.position, z: value },
            });

            if (selectedObjectID)
              objectsMap[selectedObjectID].isPositionDirty = true;
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <Input
          helperText="scale-x"
          value={input.scale.x}
          onChange={(value: any) => {
            setInput({
              ...input,
              scale: { ...input.scale, x: value },
            });

            if (selectedObjectID) objectsMap[selectedObjectID].isScaleDirty = true;
          }}
        />
        <Input
          helperText="scale-y"
          value={input.scale.y}
          onChange={(value: any) => {
            setInput({
              ...input,
              scale: { ...input.scale, y: value },
              isScaleDirty: true,
            });

            if (selectedObjectID) objectsMap[selectedObjectID].isScaleDirty = true;
          }}
        />
        <Input
          helperText="scale-z"
          value={input.scale.z}
          onChange={(value: any) => {
            setInput({
              ...input,
              scale: { ...input.scale, z: value },
              isScaleDirty: true,
            });

            if (selectedObjectID) objectsMap[selectedObjectID].isScaleDirty = true;
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <Input
          helperText="rotation-z (deg)"
          value={input.rotation.z}
          onChange={(value: any) => {
            setInput({
              ...input,
              rotation: { ...input.rotation, z: value },
              isRotationDirty: true,
            });

            if (selectedObjectID)
              objectsMap[selectedObjectID].isRotationDirty = true;
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!selectedObjectID}
          content="Cannot add objects in Edit Mode. Please deselect active item
              (Click on item again)"
        >
          <Button
            disabled={!!selectedObjectID}
            onClick={() => onClickAdd(selectValue.value)}
            label="Add"
          />
        </Tooltip>
        <Tippy
          animation
          trigger={"click"}
          interactive
          content={
            <SketchPicker
              color={{
                r: input.color.r * 255,
                g: input.color.g * 255,
                b: input.color.b * 255,
              }}
              onChange={({ rgb }) => {
                setInput({
                  ...input,
                  color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 },
                });

                if (selectedObjectID)
                  objectsMap[selectedObjectID].isColorDirty = true;
              }}
            />
          }
        >
          <ColorBlock
            color={`rgb(${input.color.r * 255}, ${input.color.g * 255}, ${
              input.color.b * 255
            })`}
          />
        </Tippy>
      </div>
      <div
        className={styles.wrapper}
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <ObjectList
          onSelectedObjectIDChange={onSelectedObjectIDChange}
          selectedObjectID={selectedObjectID}
          objectsMap={objectsMap}
        />
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to reset position"
        >
          <Button
            label="Reset position"
            disabled={
              !selectedObjectID || !objectsMap[selectedObjectID].isPositionDirty
            }
            onClick={() =>
              selectedObjectID && onClickReset(selectedObjectID, "position")
            }
          />
        </Tooltip>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to reset scale"
        >
          <Button
            label="Reset Scale"
            disabled={
              !selectedObjectID || !objectsMap[selectedObjectID].isScaleDirty
            }
            onClick={() =>
              selectedObjectID && onClickReset(selectedObjectID, "scale")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to reset rotation"
        >
          <Button
            label="Reset Rotation"
            disabled={
              !selectedObjectID || !objectsMap[selectedObjectID].isRotationDirty
            }
            onClick={() =>
              selectedObjectID && onClickReset(selectedObjectID, "rotation")
            }
          />
        </Tooltip>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to reset color"
        >
          <Button
            label="Reset Color"
            disabled={
              !selectedObjectID || !objectsMap[selectedObjectID].isColorDirty
            }
            onClick={() =>
              selectedObjectID && onClickReset(selectedObjectID, "color")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to reset"
        >
          <Button
            disabled={
              !selectedObjectID ||
              !(
                objectsMap[selectedObjectID].isColorDirty ||
                objectsMap[selectedObjectID].isPositionDirty ||
                objectsMap[selectedObjectID].isRotationDirty ||
                objectsMap[selectedObjectID].isScaleDirty
              )
            }
            label="Reset"
            onClick={() =>
              selectedObjectID && onClickReset(selectedObjectID, "all")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!selectedObjectID}
          content="An active item should be selected from the list to remove"
        >
          <Button
            onClick={() => selectedObjectID && onClickRemove(selectedObjectID)}
            disabled={!selectedObjectID}
            label="Remove"
          />
        </Tooltip>
      </div>
    </div>
  );
}

export { SettingsPanel as default };
