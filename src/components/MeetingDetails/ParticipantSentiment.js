import { Space } from "antd";
import VParticipantSentiment from "../Vis/VParticipantSentiment";
import sentimentFlowData from "../../data/sentiment_flow.json";

function ParticipantSentiment() {
  return (
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
  );
}

export default ParticipantSentiment;
