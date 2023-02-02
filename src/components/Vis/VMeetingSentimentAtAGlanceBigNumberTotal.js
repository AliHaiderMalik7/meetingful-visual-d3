import { format } from "d3";
import VBigNumber from "./VBigNumber";

const formatCount = format(",");

const VMeetingSentimentAtAGlanceBigNumberTotal = ({ data = 0 }) => {
  return (
    <VBigNumber
      number={formatCount(data)}
      description="Total sentiment phrases contributed"
    />
  );
};

export default VMeetingSentimentAtAGlanceBigNumberTotal;
