import { Space } from "antd";
import VMeetingHighlights from "../Vis/VMeetingHighlights";

import insightsData from "../../data/insights.json";

function MeetingHighlights() {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <h2
        style={{
          font: "var(--font-h3)",
          color: "var(--color-dark-900)",
          margin: 0,
        }}
      >
        Your Meeting Highlights
      </h2>
      <VMeetingHighlights data={insightsData} />
    </Space>
  );
}

export default MeetingHighlights;
