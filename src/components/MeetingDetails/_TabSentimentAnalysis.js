import { Divider, Space } from "antd";
import VSentimentMeetingTone from "../Vis/VSentimentMeetingTone";
import VTopicSentiment from "../Vis/VTopicSentiment";
import VParticipantSentiment from "../Vis/VParticipantSentiment";

import sentimentFlowData from "../../data/sentiment_flow.json";
import topPhraseSentenceSentimentData from "../../data/top_phrase_sentence_sentiment.json";

const TabSentimentAnalysis = () => {
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h2
          style={{
            font: "var(--font-h3)",
            color: "var(--color-dark-900)",
            margin: 0,
          }}
        >
          Sentiment Meeting Tone
        </h2>
        <VSentimentMeetingTone data={sentimentFlowData} threshold={4} />
      </Space>
      <Divider />
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h2
          style={{
            font: "var(--font-h3)",
            color: "var(--color-dark-900)",
            margin: 0,
          }}
        >
          Topic Sentiment
        </h2>
        <VTopicSentiment
          topicData={topPhraseSentenceSentimentData}
          sentenceData={sentimentFlowData}
        />
      </Space>
      <Divider />
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h2
          style={{
            font: "var(--font-h3)",
            color: "var(--color-dark-900)",
            margin: 0,
          }}
        >
          Participant Sentiment
        </h2>
        <VParticipantSentiment data={sentimentFlowData} />
      </Space>
    </>
  );
};

export default TabSentimentAnalysis;
