import VColorSwatch from "./VColorSwatch";
import styles from "./VColorSwatches.module.css";

const VColorSwatches = ({ color }) => {
  return (
    <div className={`v ${styles.container}`}>
      {color.domain().map((label) => (
        <VColorSwatch
          key={label}
          color={color(label)}
          label={label}
        ></VColorSwatch>
      ))}
    </div>
  );
};

export default VColorSwatches;
