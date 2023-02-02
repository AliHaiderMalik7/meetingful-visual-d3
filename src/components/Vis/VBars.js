import { format, max, scaleLinear } from "d3";
import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMeasure } from "react-use";
import VTooltip from "./VTooltip";
import styles from "./VBars.module.css";

const formatCount = format(",");

const Group = memo(({ data, maxValue, setD }) => {
  const x = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 100]),
    [maxValue]
  );

  return (
    <div className={styles.group}>
      <div className={styles.groupName}>{data.key}</div>
      <div className={styles.groupBars}>
        {data.values.map((d) => (
          <Bar key={d.key} d={d} x={x} setD={setD} />
        ))}
      </div>
    </div>
  );
});

const Bar = memo(({ d, x, setD }) => {
  const [refBar, { width: bw }] = useMeasure();
  const [refBarName, { width: bnw }] = useMeasure();

  const handlePointerEnter = useCallback(() => {
    setD(d);
  }, [d, setD]);

  const handlePointerLeave = useCallback(() => {
    setD(null);
  }, [setD]);

  const barNameAlign = bw === bnw ? "left" : "right";

  return (
    <div ref={refBar} className={styles.bar}>
      <div
        ref={refBarName}
        className={styles.barName}
        style={{ textAlign: barNameAlign }}
      >
        {d.key}
      </div>
      <div className={styles.barContainer}>
        <div
          className={styles.barFill}
          style={{ width: `${x(d.value)}%` }}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        ></div>
        <div
          className={styles.barLabel}
          style={{ right: `${100 - x(d.value)}%` }}
        >
          {formatCount(d.value)}
        </div>
      </div>
    </div>
  );
});

const Tooltip = forwardRef(({ d }, ref) => {
  return (
    <VTooltip ref={ref} isVisible={!!d}>
      {d && (
        <>
          <div className={styles.tooltipKey}>{d.key}</div>
          <div>{formatCount(d.value)}</div>
        </>
      )}
    </VTooltip>
  );
});

const VBars = ({ data }) => {
  const ref = useRef(null);

  const [d, setD] = useState(null);

  const maxValue = useMemo(
    () => max(data, (d) => max(d.values, (d) => d.value)),
    [data]
  );

  return (
    <div ref={ref} className={`v ${styles.container}`}>
      {data.map((d) => (
        <Group key={d.key} data={d} maxValue={maxValue} setD={setD} />
      ))}
      <Tooltip ref={ref} d={d} />
    </div>
  );
};

export default VBars;
