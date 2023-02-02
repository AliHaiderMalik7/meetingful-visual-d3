import { OVERALL_SENTIMENT_ACCESSORS } from "./constants";
import VDonutSentiment from "./VDonutSentiment";

const VMeetingSentimentAtAGlanceDonut = ({ data }) => {
  const transformedData = [
    {
      key: "negative",
      value: OVERALL_SENTIMENT_ACCESSORS.negative(data),
    },
    {
      key: "neutral",
      value: OVERALL_SENTIMENT_ACCESSORS.neutral(data),
    },
    {
      key: "positive",
      value: OVERALL_SENTIMENT_ACCESSORS.positive(data),
    },
  ];
  return <VDonutSentiment data={transformedData} />;
};

export default VMeetingSentimentAtAGlanceDonut;
