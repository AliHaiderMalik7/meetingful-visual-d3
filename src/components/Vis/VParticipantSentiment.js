import { useMemo } from "react";
import { ascending, descending, group, rollup, sum } from "d3";
import { Space } from "antd";
import { SENTIMENTS, SENTIMENT_FLOW_ACCESSORS } from "./constants";
import VColorSwatchesSentiment from "./VColorSwatchesSentiment";
import VWaffleSentiment from "./VWaffleSentiment";

const VParticipantSentiment = ({ data }) => {
  const displayData = useMemo(() => {
    const filtered = data.filter(SENTIMENT_FLOW_ACCESSORS.isKeySentence);
    const displayData = Array.from(
      rollup(
        filtered,
        (v) =>
          Array.from(
            group(v, SENTIMENT_FLOW_ACCESSORS.sentiment),
            ([sentiment, sentences]) => ({ sentiment, sentences })
          ).sort((a, b) =>
            ascending(
              SENTIMENTS.indexOf(a.sentiment),
              SENTIMENTS.indexOf(b.sentiment)
            )
          ),
        SENTIMENT_FLOW_ACCESSORS.speaker
      ),
      ([key, sentiments]) => ({
        groupKey: key,
        sentiments,
        total: sum(sentiments, (d) => d.sentences.length),
      })
    );
    displayData.sort((a, b) => descending(a.total, b.total));
    return displayData;
  }, [data]);

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <VColorSwatchesSentiment />
      <VWaffleSentiment data={displayData} groupBy="speaker" />
    </Space>
  );
};

export default VParticipantSentiment;
