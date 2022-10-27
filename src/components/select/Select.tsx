import { ObjectTypes } from "@/types/object";
import ReactSelect from "react-select";

type SelectType = {
  value: { label: string; value: ObjectTypes };
  options: { label: string; value: ObjectTypes }[];
};

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

function Select({ options, value }: SelectType) {
  return (
    <div style={{ width: "100%" }}>
      <ReactSelect
        value={value}
        options={options}
        styles={{
          control: CustomControlStyles,
          singleValue: CustomSingleValueStyles,
          menu: CustomMenuStyles,
          option: CustomOptionStyles,
        }}
      />
    </div>
  );
}

export { Select as default };
