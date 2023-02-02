import { forwardRef } from "react";
import { useMeasure, useMouseHovered } from "react-use";
import styles from "./VTooltip.module.css";

const Y_OFFSET = 12;

const VTooltip = forwardRef(({ children, isVisible }, boundRef) => {
  const {
    elX: x0,
    elY: y0,
    elW: bw,
  } = useMouseHovered(boundRef, {
    bound: true,
    whenHovered: true,
  });
  const [ref, { width: tw }] = useMeasure();

  let x = x0;
  if (x < tw / 2) {
    x = tw / 2;
  } else if (x + tw / 2 > bw) {
    x = bw - tw / 2;
  }

  let y = y0 - Y_OFFSET;

  return (
    <div
      ref={ref}
      className={`v ${styles.tooltip} ${isVisible ? styles.isVisible : ""}`}
      style={{
        transform: `translate(calc(-50% + ${x}px),calc(-100% + ${y}px))`,
      }}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
});

export default VTooltip;
