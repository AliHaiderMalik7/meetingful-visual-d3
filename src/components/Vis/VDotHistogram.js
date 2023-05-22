import {
  forwardRef,
  memo,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import {
  ascending,
  bin,
  format,
  max,
  range,
  scaleLinear,
  scalePoint,
  utcFormat,
} from "d3";
import { SENTIMENTS, SENTIMENT_FLOW_ACCESSORS } from "./constants";
import VTooltip from "./VTooltip";
import VSentenceSentiment from "./VSentenceSentiment";
import styles from "./VDotHistogram.module.css";

const formatCount = format(",");
const formatTime = (d) => utcFormat("%H:%M")(new Date(d));

const HotSpotRect = memo(({ d }) => {
  return (
    <rect
      className={styles.hotSpotRect}
      x={d.x}
      y={d.y}
      rx={d.rx}
      width={d.width}
      height={d.height}
    ></rect>
  );
});

const DotRect = memo(({ d, setD }) => {
  const handlePointerEnter = useCallback(() => {
    setD(d);
  }, [d, setD]);

  const handlePointerLeave = useCallback(() => {
    setD(null);
  }, [setD]);

  return (
    <rect
      className={styles.dotRect}
      rx={d.rx}
      x={d.x}
      y={d.y}
      width={d.width}
      height={d.height}
      fill="currentColor"
      style={{ color: d.color }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    ></rect>
  );
});

const XAxis = memo(({ x, tickValues }) => {
  return (
    <>
      <line x1={x.range()[0]} x2={x.range()[1]} stroke="currentColor"></line>
      {tickValues.map((d) => (
        <g key={d} transform={`translate(${x(d)}, 0)`}>
          <line y2={8} stroke="currentColor"></line>
          <text
            fill="currentColor"
            textAnchor="middle"
            dominantBaseline="hanging"
            y={12}
          >
            {formatTime(d)}
          </text>
        </g>
      ))}
    </>
  );
});

const YAxis = memo(({ y, tickValues }) => {
  return (
    <>
      {tickValues.map((d) => (
        <g key={d} transform={`translate(0,${y(d)})`}>
          <line x2={-8} stroke="currentColor"></line>
          <text
            fill="currentColor"
            textAnchor="end"
            dominantBaseline="middle"
            x={-12}
          >
            {formatCount(d)}
          </text>
        </g>
      ))}
    </>
  );
});

const Tooltip = forwardRef(({ d }, ref) => {
  return (
    <VTooltip ref={ref} isVisible={!!d}>
      {d && <VSentenceSentiment d={d} />}
    </VTooltip>
  );
});

const VDotHistogram = ({
  data,
  threshold = Infinity,
  binSize = 1 * 60 * 1000,
}) => {
  const ref = useRef(null);

  const [d, setD] = useState(null);

  const dms = {
    marginTop: 8,
    marginRight: 24,
    marginBottom: 24,
    marginLeft: 40,
  };

  const dotBandwidth = 16;
  const dotPadding = 4;
  const dotStep = dotBandwidth + dotPadding;
  const dotCornerRadius = dotBandwidth / 2; // Make it circular

  const xMax = useMemo(() => {
    const d = data[data.length - 1];
    return (
      Math.ceil(
        (SENTIMENT_FLOW_ACCESSORS.startTime(d) +
          SENTIMENT_FLOW_ACCESSORS.duration(d)) /
          binSize
      ) * binSize
    );
  }, [binSize, data]);

  const thresholds = useMemo(
    () => range(0, xMax + 1, binSize),
    [binSize, xMax]
  );

  const binnedData = useMemo(() => {
    const binnedData = bin()
      .value(SENTIMENT_FLOW_ACCESSORS.startTime)
      .domain([0, xMax])
      .thresholds(thresholds)(data);
    binnedData.forEach((d) =>
      d.sort((a, b) =>
        ascending(
          SENTIMENTS.indexOf(SENTIMENT_FLOW_ACCESSORS.sentiment(a)),
          SENTIMENTS.indexOf(SENTIMENT_FLOW_ACCESSORS.sentiment(b))
        )
      )
    );
    return binnedData;
  }, [data, thresholds, xMax]);

  const yMax = useMemo(() => max(binnedData, (d) => d.length), [binnedData]);

  dms.width = useMemo(
    () => dms.marginLeft + dms.marginRight + (xMax / binSize) * dotStep,
    [binSize, dms.marginLeft, dms.marginRight, dotStep, xMax]
  );

  dms.height = useMemo(
    () => dms.marginTop + dms.marginBottom + yMax * dotStep,
    [dms.marginBottom, dms.marginTop, dotStep, yMax]
  );

  const x = useMemo(
    () =>
      scaleLinear()
        .domain([0, xMax])
        .range([dms.marginLeft, dms.width - dms.marginRight]),
    [dms.marginLeft, dms.marginRight, dms.width, xMax]
  );

  const y = useMemo(
    () =>
      scalePoint()
        .domain(range(yMax + 1))
        .range([dms.height - dms.marginBottom, dms.marginTop]),
    [dms.height, dms.marginBottom, dms.marginTop, yMax]
  );

  const displayData = useMemo(
    () =>
      binnedData.reduce((displayData, currentBin) => {
        const x0 = x(currentBin.x0) + dotPadding / 2;
        return [
          ...displayData,
          ...currentBin.map((d, i) => {
            const y0 = y(i) - dotStep + dotPadding / 2;
            return {
              ...d,
              x: x0,
              y: y0,
              rx: dotCornerRadius,
              width: dotBandwidth,
              height: dotBandwidth,
              color: `var(--color-${SENTIMENT_FLOW_ACCESSORS.sentiment(d)})`,
            };
          }),
        ];
      }, []),
    [binnedData, dotStep, x, y]
  );

  const yTicks = range(0, yMax + 1, 5).slice(1);

  const xTicks = range(0, xMax + 1, binSize * 5);

  const hotSpotsData = useMemo(
    () =>
      binnedData
        .filter((d) => d.length >= threshold)
        .map((d) => {
          return {
            rx: 4,
            x: x(d.x0) - dotPadding / 2,
            y: dms.marginTop - dotPadding / 2,
            width: dotStep + dotPadding,
            height: dms.height - dms.marginTop - dms.marginBottom + dotPadding,
          };
        }),
    [
      binnedData,
      dms.height,
      dms.marginBottom,
      dms.marginTop,
      dotStep,
      threshold,
      x,
    ]
  );

  return (
    <div ref={ref} className={`v ${styles.container}`}>
      <svg
        className={styles.fixedSvg}
        width={dms.marginLeft + 1}
        height={dms.height}
      >
        <g
          transform={`translate(${dms.marginLeft},0)`}
          className={`${styles.axis} ${styles.axisHalo}`}
        >
          <YAxis y={y} tickValues={yTicks} />
        </g>
        <g transform={`translate(${dms.marginLeft},0)`} className={styles.axis}>
          <YAxis y={y} tickValues={yTicks} />
        </g>
      </svg>
      <div className={styles.scrollable}>
        <svg width={dms.width} height={dms.height}>
          <g>
            {hotSpotsData.map((d, i) => (
              <HotSpotRect key={i} d={d} />
            ))}
          </g>
          <g
            transform={`translate(0,${dms.height - dms.marginBottom})`}
            className={styles.axis}
          >
            <XAxis x={x} tickValues={xTicks} />
          </g>
          <g>
            {displayData.map((d) => (
              <DotRect key={SENTIMENT_FLOW_ACCESSORS.id(d)} d={d} setD={setD} />
            ))}
          </g>
        </svg>
      </div>
      <Tooltip ref={ref} d={d} />
    </div>
  );
};

export default VDotHistogram;
