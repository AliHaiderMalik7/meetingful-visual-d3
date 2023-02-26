import { scaleUtc } from "d3";
import { useCallback, useMemo, useRef, useState } from "react";
import useChartDimensions from "./use-chart-dimensions";
import { INSIGHTS_ACCESSORS } from "./constants";
import VMeetingHighlightsInsightsPie from "./VMeetingHighlightsInsightsPie";
import styles from "./VMeetingHighlightsTableTimeline.module.css";

const PIE_SIZE = 16;
const chartSettings = {
  marginTop: PIE_SIZE,
  marginRight: 16,
  marginBottom: PIE_SIZE,
  marginLeft: 16,
  height: PIE_SIZE * 2,
};

const VMeetingHighlightsTableTimeline = ({ data, xMax, handleClick }) => {
  const ref = useRef(null);
  const [d, setD] = useState(null);

  const dms = useChartDimensions(ref, chartSettings);

  const x = useMemo(
    () =>
      scaleUtc()
        .domain([new Date(0), xMax])
        .range([dms.marginLeft, dms.width - dms.marginRight]),
    [dms.marginLeft, dms.marginRight, dms.width, xMax]
  );

  const handlePointerEnter = useCallback(
    (d) => {
      setD(d);
    },
    [setD]
  );

  const handlePointerLeave = useCallback(() => {
    setD(null);
  }, [setD]);

  return (
    <div className="v" ref={ref}>
      <svg
        className={styles.svg}
        viewBox={`0 ${-dms.marginTop} ${dms.width} ${dms.height}`}
      >
        <g className={styles.axis}>
          <line
            x1={x.range()[0]}
            x2={x.range()[1]}
            stroke="currentColor"
          ></line>
        </g>
        <g>
          {data.data.map((d) => (
            <g
              key={INSIGHTS_ACCESSORS.utteranceStart(d)}
              className={styles.item}
              transform={`translate(${x(
                INSIGHTS_ACCESSORS.utteranceStart(d)
              )},0)`}
              onPointerEnter={() => handlePointerEnter(d)}
              onPointerLeave={() => handlePointerLeave(d)}
              onClick={() => handleClick(data.speaker, d)}
            >
              <VMeetingHighlightsInsightsPie
                data={INSIGHTS_ACCESSORS.insightTypes(d)}
                size={PIE_SIZE}
              />
            </g>
          ))}
        </g>
        {d && (
          <g
            className={styles.overlayItem}
            transform={`translate(${x(
              INSIGHTS_ACCESSORS.utteranceStart(d)
            )},0)`}
          >
            <VMeetingHighlightsInsightsPie
              data={INSIGHTS_ACCESSORS.insightTypes(d)}
              size={PIE_SIZE}
            />
            <circle className={styles.overlayOutline} r={PIE_SIZE / 2}></circle>
          </g>
        )}
      </svg>
    </div>
  );
};

export default VMeetingHighlightsTableTimeline;
