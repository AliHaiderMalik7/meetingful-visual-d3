import { Space } from "antd";
import VSentimentMeetingTone from "../Vis/VSentimentMeetingTone";
import sentimentFlowData from "../../data/sentiment_flow.json";

function SentimentMeetingTone() {
  return (
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
  );
}

export default SentimentMeetingTone;
