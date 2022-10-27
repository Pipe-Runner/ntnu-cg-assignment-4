import { forwardRef } from "react";
import { IconType } from "react-icons";
import styles from "./styles.module.css";

type ButtonProps = {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ label, icon: IconComponent, onClick, disabled }: ButtonProps, ref) => {
    return (
      <div ref={ref} style={{ width: "100%" }}>
        <button
          disabled={disabled}
          className={styles.container}
          onClick={onClick}
        >
          {IconComponent && (
            <div>
              <IconComponent />
            </div>
          )}
          {label}
        </button>
      </div>
    );
  }
);

export { Button as default };
