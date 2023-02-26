import { arc, ascending, pie } from "d3";
import { useMemo } from "react";
import { insightColor, INSIGHT_TYPES } from "./constants";

const VMeetingHighlightsInsightsPie = ({ data, size }) => {
  const arcGenerator = useMemo(
    () =>
      arc()
        .innerRadius(0)
        .outerRadius(size / 2),
    [size]
  );

  const pieData = useMemo(() => {
    const pieData = pie()
      .sort((a, b) =>
        ascending(INSIGHT_TYPES.indexOf(a), INSIGHT_TYPES.indexOf(b))
      )
      .value(() => 1)(data);
    pieData.forEach((d) => {
      d.color = insightColor(d.data);
      d.d = arcGenerator(d);
    });
    return pieData;
  }, [arcGenerator, data]);

  return (
    <>
      {pieData.map((d) => (
        <path key={d.data} fill={d.color} d={d.d}></path>
      ))}
    </>
  );
};

export default VMeetingHighlightsInsightsPie;
