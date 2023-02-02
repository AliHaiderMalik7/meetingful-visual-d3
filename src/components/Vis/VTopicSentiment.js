import { useMemo } from "react";
import { ascending, descending, group, sum } from "d3";
import { Space } from "antd";
import {
  SENTIMENTS,
  SENTIMENT_FLOW_ACCESSORS,
  TOP_PHRASE_SENTENCE_SENTIMENT_ACCESSORS,
} from "./constants";
import VColorSwatchesSentiment from "./VColorSwatchesSentiment";
import VWaffleSentiment from "./VWaffleSentiment";

const VTopicSentiment = ({ topicData, sentenceData }) => {
  const displayData = useMemo(() => {
    const sentenceMap = new Map(
      sentenceData.map((d) => [SENTIMENT_FLOW_ACCESSORS.id(d), d])
    );
    const displayData = topicData.map((d) => {
      const groupKey = TOP_PHRASE_SENTENCE_SENTIMENT_ACCESSORS.topic(d);
      const sentiments = Array.from(
        group(
          TOP_PHRASE_SENTENCE_SENTIMENT_ACCESSORS.sentenceIds(d).map((id) =>
            sentenceMap.get(id)
          ),
          SENTIMENT_FLOW_ACCESSORS.sentiment
        ),
        ([sentiment, sentences]) => ({ sentiment, sentences })
      ).sort((a, b) =>
        ascending(
          SENTIMENTS.indexOf(a.sentiment),
          SENTIMENTS.indexOf(b.sentiment)
        )
      );
      const total = sum(sentiments, (d) => d.sentences.length);
      return {
        groupKey,
        sentiments,
        total,
      };
    });
    displayData.sort((a, b) => descending(a.total, b.total));
    return displayData;
  }, [sentenceData, topicData]);

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <VColorSwatchesSentiment />
      <VWaffleSentiment data={displayData} groupBy="speaker" />
    </Space>
  );
};

export default VTopicSentiment;
