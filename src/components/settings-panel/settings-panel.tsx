import Button from "../button";
import Input from "../input";
import styles from "./styles.module.css";
import Select from "../select";

import { SketchPicker } from "react-color";
import Tippy from "@tippyjs/react";
import { FiSettings as SettingsIcon } from "react-icons/fi";
import ColorBlock from "../color-block";
import ObjectList from "../object-list/object-list";
import {
  Object3D,
  Object3DExtended,
  ObjectTypes,
  ResetType,
} from "@/types/object";
import { useState } from "react";
import Tooltip from "../tooltip";

type SettingsPanelProps = {
  onClickAdd: (type: ObjectTypes) => void;
  onClickRemove: (id: string) => void;
  objectsMap: Record<string, Object3DExtended>;
  onActiveObjectIdChange: (id: string | undefined) => void;
  activeObjectId: string | undefined;
  input: Object3D;
  setInput: (arg: Object3D) => void;
  onClickReset: (id: string, type: ResetType) => void;
};

const OPTIONS: { label: string; value: ObjectTypes }[] = [
  { label: "Plane", value: "plane" },
  { label: "Disc", value: "disc" },
  { label: "Cube", value: "cube" },
  { label: "Pyramid", value: "pyramid" },
  { label: "Cone", value: "cone" },
  { label: "Cylinder", value: "cylinder" },
  { label: "Sphere", value: "sphere" },
  { label: "Torus", value: "torus" },
];

function SettingsPanel({
  onClickAdd,
  onClickRemove,
  objectsMap,
  onActiveObjectIdChange,
  activeObjectId,
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
        <Select
          isDisabled={!!activeObjectId}
          options={OPTIONS}
          value={selectValue}
          onChangeOption={setSelectValue}
        />
      </div>
      <div className={styles.wrapper}>
        <Input
          helperText="position-x"
          value={input.posX}
          onChange={(value: any) => {
            setInput({
              ...input,
              posX: value,
              isPositionDirty: true,
            });
          }}
        />
        <Input
          helperText="position-y"
          value={input.posY}
          onChange={(value: any) => {
            setInput({
              ...input,
              posY: value,
              isPositionDirty: true,
            });
          }}
        />
        <Input
          helperText="position-z"
          value={input.posZ}
          onChange={(value: any) => {
            setInput({
              ...input,
              posZ: value,
              isPositionDirty: true,
            });
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <Input
          helperText="scale-x"
          value={input.scaleX}
          onChange={(value: any) => {
            setInput({
              ...input,
              scaleX: value,
              isScaleDirty: true,
            });
          }}
        />
        <Input
          helperText="scale-y"
          value={input.scaleY}
          onChange={(value: any) => {
            setInput({
              ...input,
              scaleY: value,
              isScaleDirty: true,
            });
          }}
        />
        <Input
          helperText="scale-z"
          value={input.scaleZ}
          onChange={(value: any) => {
            setInput({
              ...input,
              scaleZ: value,
              isScaleDirty: true,
            });
          }}
        />
      </div>
      <div className={styles.wrapper}>
      <Input
          helperText="rotation-x (deg)"
          value={input.rotationX}
          onChange={(value: any) => {
            setInput({
              ...input,
              rotationX: value,
              isRotationDirty: true,
            });
          }}
        />
        <Input
          helperText="rotation-y (deg)"
          value={input.rotationY}
          onChange={(value: any) => {
            setInput({
              ...input,
              rotationY: value,
              isRotationDirty: true,
            });
          }}
        />
        <Input
          helperText="rotation-z (deg)"
          value={input.rotationZ}
          onChange={(value: any) => {
            setInput({
              ...input,
              rotationZ: value,
              isRotationDirty: true,
            });
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!activeObjectId}
          content="Cannot add objects in Edit Mode. Please deselect active item
              (Click on item again)"
        >
          <Button
            disabled={!!activeObjectId}
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
                r: input.r * 255,
                g: input.g * 255,
                b: input.b * 255,
              }}
              onChange={({ rgb }) => {
                setInput({
                  ...input,
                  r: rgb.r / 255,
                  g: rgb.g / 255,
                  b: rgb.b / 255,
                  isColorDirty: true,
                });
              }}
            />
          }
        >
          <ColorBlock
            color={`rgb(${input.r * 255}, ${input.g * 255}, ${input.b * 255})`}
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
          onActiveObjectIdChange={onActiveObjectIdChange}
          activeObjectId={activeObjectId}
          objectsMap={objectsMap}
        />
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to reset position"
        >
          <Button
            label="Reset position"
            disabled={
              !activeObjectId || !objectsMap[activeObjectId].isPositionDirty
            }
            onClick={() =>
              activeObjectId && onClickReset(activeObjectId, "position")
            }
          />
        </Tooltip>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to reset scale"
        >
          <Button
            label="Reset Scale"
            disabled={
              !activeObjectId || !objectsMap[activeObjectId].isScaleDirty
            }
            onClick={() =>
              activeObjectId && onClickReset(activeObjectId, "scale")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to reset rotation"
        >
          <Button
            label="Reset Rotation"
            disabled={
              !activeObjectId || !objectsMap[activeObjectId].isRotationDirty
            }
            onClick={() =>
              activeObjectId && onClickReset(activeObjectId, "rotation")
            }
          />
        </Tooltip>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to reset color"
        >
          <Button
            label="Reset Color"
            disabled={
              !activeObjectId || !objectsMap[activeObjectId].isColorDirty
            }
            onClick={() =>
              activeObjectId && onClickReset(activeObjectId, "color")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to reset"
        >
          <Button
            disabled={
              !activeObjectId ||
              !(
                objectsMap[activeObjectId].isColorDirty ||
                objectsMap[activeObjectId].isPositionDirty ||
                objectsMap[activeObjectId].isRotationDirty ||
                objectsMap[activeObjectId].isScaleDirty
              )
            }
            label="Reset"
            onClick={() =>
              activeObjectId && onClickReset(activeObjectId, "all")
            }
          />
        </Tooltip>
      </div>
      <div className={styles.wrapper}>
        <Tooltip
          isDisabled={!!activeObjectId}
          content="An active item should be selected from the list to remove"
        >
          <Button
            onClick={() => activeObjectId && onClickRemove(activeObjectId)}
            disabled={!activeObjectId}
            label="Remove"
          />
        </Tooltip>
      </div>
    </div>
  );
}

export { SettingsPanel as default };
