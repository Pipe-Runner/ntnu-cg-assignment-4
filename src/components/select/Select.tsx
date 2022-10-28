import { ObjectTypes } from "@/types/object";
import ReactSelect from "react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomControlStyles = (base: any, state: any) => ({
  ...base,
  backgroundColor: state.isFocused ? "var(--4dp)" : "var(--2dp)",
  borderColor: state.isFocused ? "var(--accent)" : "var(--16dp)",
  boxShadow: "none",
});

const CustomMenuStyles = (base: any, state: any) => ({
  ...base,
  backgroundColor: "var(--16dp)",
});

const CustomOptionStyles = (base: any, state: any) => {
  return {
    ...base,
    backgroundColor: state.isSelected
      ? "var(--primary-v1)"
      : state.isFocused
      ? "var(--16dp)"
      : "var(--12dp)",
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSingleValueStyles = (base: any) => ({
  ...base,
  color: "var(--text-medium)",
});

type SelectType = {
  value: { label: string; value: ObjectTypes };
  options: { label: string; value: ObjectTypes }[];
  onChangeOption: (option: { label: string; value: ObjectTypes }) => void;
  isDisabled?: boolean;
};

function Select({ options, value, onChangeOption, isDisabled }: SelectType) {
  return (
    <div
      style={{ width: "100%", cursor: isDisabled ? "not-allowed" : "unset" }}
    >
      <ReactSelect
        isDisabled={isDisabled}
        value={value}
        options={options}
        styles={{
          control: CustomControlStyles,
          singleValue: CustomSingleValueStyles,
          menu: CustomMenuStyles,
          option: CustomOptionStyles,
        }}
        onChange={(newValue) =>
          newValue &&
          onChangeOption({
            label: newValue.label,
            value: newValue.value,
          })
        }
      />
    </div>
  );
}

export { Select as default };
