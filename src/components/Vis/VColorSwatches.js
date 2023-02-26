import VColorSwatch from "./VColorSwatch";
import styles from "./VColorSwatches.module.css";

const VColorSwatches = ({ color, selected, setSelected }) => {
  const handleChange = (event) => {
    let nextSelected = [...selected];
    if (selected.includes(event.target.value)) {
      nextSelected = nextSelected.filter((d) => d !== event.target.value);
      if (nextSelected.length === 0) {
        nextSelected = color.domain();
      }
    } else {
      nextSelected = color
        .domain()
        .filter((d) => nextSelected.includes(d) || event.target.value === d);
    }
    setSelected(nextSelected);
  };

  return (
    <div className={`v ${styles.container}`}>
      {color
        .domain()
        .map((label) =>
          selected ? (
            <VColorSwatch
              key={label}
              color={color(label)}
              label={label}
              checked={selected.includes(label)}
              handleChange={handleChange}
            ></VColorSwatch>
          ) : (
            <VColorSwatch
              key={label}
              color={color(label)}
              label={label}
            ></VColorSwatch>
          )
        )}
    </div>
  );
};

export default VColorSwatches;
