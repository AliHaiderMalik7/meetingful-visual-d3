import { scaleUtc } from "d3";
import { memo, useMemo, useRef } from "react";
import useChartDimensions from "./use-chart-dimensions";
import { formatMeetingTimeTick } from "./utilities";
import styles from "./VMeetingHighlightsTableTimeAxis.module.css";

const chartSettings = {
  marginTop: 23,
  marginRight: 16,
  marginBottom: 1,
  marginLeft: 16,
  height: 24,
};

const XAxis = memo(({ x, tickValues }) => {
  return (
    <>
      <line x1={x.range()[0]} x2={x.range()[1]} stroke="currentColor"></line>
      {tickValues.map((d) => (
        <g key={d} transform={`translate(${x(d)}, 0)`}>
          <line y2={-8} stroke="currentColor"></line>
          <text fill="currentColor" textAnchor="middle" y={-12}>
            {formatMeetingTimeTick(d)}
          </text>
        </g>
      ))}
    </>
  );
});

const VMeetingHighlightsTableTimeAxis = ({ xMax }) => {
  const ref = useRef(null);

  const dms = useChartDimensions(ref, chartSettings);

  const x = useMemo(
    () =>
      scaleUtc()
        .domain([new Date(0), xMax])
        .range([dms.marginLeft, dms.width - dms.marginRight]),
    [dms.marginLeft, dms.marginRight, dms.width, xMax]
  );

  const xTicks = useMemo(
    () => x.ticks(dms.boundedWidth / 120),
    [dms.boundedWidth, x]
  );

  return (
    <div className="v" ref={ref}>
      <svg className={styles.svg} viewBox={`0 0 ${dms.width} ${dms.height}`}>
        <g
          transform={`translate(0,${dms.height - dms.marginBottom})`}
          className={styles.axis}
        >
          <XAxis x={x} tickValues={xTicks} />
        </g>
      </svg>
    </div>
  );
};

export default VMeetingHighlightsTableTimeAxis;
