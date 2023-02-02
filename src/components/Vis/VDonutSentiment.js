import { arc, format, pie, sum } from "d3";
import {
  forwardRef,
  memo,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import VTooltip from "./VTooltip";
import VColorSwatch from "./VColorSwatch";
import styles from "./VDonutSentiment.module.css";

const formatPercentage = format(".0%");
const formatCount = format(",");

const ArcPath = memo(({ d, arcGenerator, setD = () => {} }) => {
  const handlePointerEnter = useCallback(() => {
    setD(d);
  }, [d, setD]);

  const handlePointerLeave = useCallback(() => {
    setD(null);
  }, [setD]);

  return (
    <path
      key={d.data.key}
      fill="currentColor"
      d={arcGenerator(d)}
      style={{ color: `var(--color-${d.data.key})` }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    ></path>
  );
});

const ArcLabel = memo(({ d, arcGenerator }) => {
  return (
    <text
      textAnchor="middle"
      dominantBaseline="middle"
      fill="currentColor"
      transform={`translate(${arcGenerator.centroid(d)})`}
      pointerEvents="none"
      className={styles.arcLabel}
    >
      {formatPercentage(d.value / d.total)}
    </text>
  );
});

const Tooltip = forwardRef(({ d }, ref) => {
  return (
    <VTooltip ref={ref} isVisible={!!d}>
      {d && (
        <>
          <div className={styles.tooltipMain}>
            <VColorSwatch
              color={`var(--color-${d.data.key})`}
              label={d.data.key}
            />
            &nbsp;
            {formatPercentage(d.value / d.total)}
          </div>
          <div className={styles.tooltipSupplement}>
            {formatCount(d.value)} out of {formatCount(d.total)}
          </div>
        </>
      )}
    </VTooltip>
  );
});

const VDonutSentiment = ({ data }) => {
  const ref = useRef(null);

  const [d, setD] = useState(null);

  const dms = {
    width: 175,
    height: 175,
  };
  const outerRadius = Math.min(dms.width, dms.height) / 2;
  const innerRadius = outerRadius * 0.5;

  const arcGenerator = useMemo(
    () => arc().innerRadius(innerRadius).outerRadius(outerRadius),
    [innerRadius, outerRadius]
  );

  const arcLabelGenerator = useMemo(
    () =>
      arc()
        .innerRadius((innerRadius + outerRadius) / 2)
        .outerRadius((innerRadius + outerRadius) / 2),
    [innerRadius, outerRadius]
  );

  const displayData = useMemo(() => {
    const displayData = pie()
      .sort(null)
      .value((d) => d.value)(data);
    const total = sum(displayData, (d) => d.value);
    displayData.forEach((d) => (d.total = total));
    return displayData;
  }, [data]);

  return (
    <div ref={ref} className={`v ${styles.container}`}>
      <svg
        width={dms.width}
        height={dms.height}
        viewBox={`${-dms.width / 2} ${-dms.height / 2} ${dms.width} ${
          dms.height
        }`}
        className={styles.svg}
      >
        <g>
          {displayData.map((d) => (
            <ArcPath
              key={d.data.key}
              d={d}
              setD={setD}
              arcGenerator={arcGenerator}
            />
          ))}
        </g>
        {d && <path d={arcGenerator(d)} className={styles.focusArcPath} />}
        <g>
          {displayData.map((d) => (
            <ArcLabel key={d.data.key} d={d} arcGenerator={arcLabelGenerator} />
          ))}
        </g>
      </svg>
      <Tooltip ref={ref} d={d} />
    </div>
  );
};

export default VDonutSentiment;
