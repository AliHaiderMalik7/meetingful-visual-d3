import { useId } from "react";
import styles from "./VColorSwatch.module.css";

const VColorSwatch = ({ color, label, checked = true, handleChange }) => {
  const id = useId();
  const displayedLabel = label.replaceAll("_", " ");

  return (
    <div className="v">
      {handleChange ? (
        <>
          <input
            type="checkbox"
            id={id}
            className="visually-hidden"
            value={label}
            checked={checked}
            onChange={handleChange}
          ></input>
          <label htmlFor={id} className={styles.label}>
            <div className={styles.swatch} style={{ color }}></div>
            <div className={styles.label}>{displayedLabel}</div>
          </label>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.swatch} style={{ color }}></div>
          <div className={styles.label}>{displayedLabel}</div>
        </div>
      )}
    </div>
  );
};

export default VColorSwatch;
