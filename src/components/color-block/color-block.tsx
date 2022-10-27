import { forwardRef } from "react";

const ColorBlock = forwardRef<HTMLDivElement, { color: string }>(
  (props: { color: string }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "42px",
          borderRadius: "6px",
          border: "1px solid var(--16dp)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            height: "100%",
            flex: 1,
            borderRadius: "3px",
            background: props.color ?? "red",
          }}
        ></div>
      </div>
    );
  }
);

export { ColorBlock as default };
