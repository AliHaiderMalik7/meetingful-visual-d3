import { scaleOrdinal } from "d3";
import { SENTIMENTS } from "./constants";
import VColorSwatches from "./VColorSwatches";

const color = scaleOrdinal()
  .domain(SENTIMENTS)
  .range(SENTIMENTS.map((d) => `var(--color-${d})`));

const VColorSwatchesSentiment = () => {
  return <VColorSwatches color={color} />;
};

export default VColorSwatchesSentiment;
