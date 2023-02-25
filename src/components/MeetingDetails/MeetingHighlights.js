import { Space } from "antd";

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
        Meeting Highlights
      </h2>
    </Space>
  );
}

export default MeetingHighlights;
