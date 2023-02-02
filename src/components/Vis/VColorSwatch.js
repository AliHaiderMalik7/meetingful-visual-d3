import styles from "./VColorSwatch.module.css";

const VColorSwatch = ({ color, label }) => {
  return (
    <div className={`v ${styles.container}`}>
      <div className={styles.swatch} style={{ backgroundColor: color }}></div>
      &nbsp;
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default VColorSwatch;
