import Tippy from "@tippyjs/react";
import { useSpring, animated } from "react-spring";

type ToolTipProps = {
  delay?: number;
  content: React.ReactNode;
  children: JSX.Element;
  isDisabled?: boolean;
};

function ToolTip({
  delay = 800,
  content,
  children,
  isDisabled = false,
}: ToolTipProps) {
  const config = { tension: 300, friction: 15 };
  const initialStyles = { opacity: 0, transform: "scale(0.5)" };
  const [props, setSpring] = useSpring(() => initialStyles);

  function onMount() {
    setSpring({
      opacity: 1,
      transform: "scale(1)",
      onRest: () => {},
      config,
    });
  }

  function onHide({ unmount }: { unmount: any }) {
    setSpring({
      ...initialStyles,
      onRest: unmount,
      config: { ...config, clamp: true },
    });
  }

  return (
    <Tippy
      animation={true}
      onMount={onMount}
      onHide={onHide}
      delay={delay}
      disabled={isDisabled}
      render={(attrs) => (
        <animated.div
          style={{
            ...props,
            background: "var(--24dp)",
            padding: 12,
            borderRadius: 8,
            maxWidth: 200,
          }}
          {...attrs}
        >
          {content}
        </animated.div>
      )}
    >
      {children}
    </Tippy>
  );
}

export { ToolTip as default };
