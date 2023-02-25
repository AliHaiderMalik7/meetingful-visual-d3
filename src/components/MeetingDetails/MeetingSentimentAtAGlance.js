import { Space } from "antd";

import VMeetingSentimentAtAGlanceDonut from "../Vis/VMeetingSentimentAtAGlanceDonut";
import VMeetingSentimentAtAGlanceBigNumberTotal from "../Vis/VMeetingSentimentAtAGlanceBigNumberTotal";
import VMeetingSentimentAtAGlanceBigNumberParticipants from "../Vis/VMeetingSentimentAtAGlanceBigNumberParticipants";

import overallSentimentData from "../../data/overall_sentiment.json";

const MeetingSentimentAtAGlanceItem = ({ chart, body, action }) => {
  return (
    <div
      style={{
        width: "270px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "175px",
          height: "175px",
          marginInline: "auto",
        }}
      >
        {chart}
      </div>
      <div
        style={{
          flex: "1",
          font: "var(--body-4)",
          color: "var(--color-dark-700)",
        }}
      >
        {body}
      </div>
      <div>{action}</div>
    </div>
  );
};

function MeetingSentimentAtAGlance() {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <h2
        style={{
          font: "var(--font-h3)",
          color: "var(--color-dark-900)",
          margin: 0,
        }}
      >
        Meeting Sentiment At a Glance
      </h2>
      <Space
        size="middle"
        wrap
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <MeetingSentimentAtAGlanceItem
          chart={
            <VMeetingSentimentAtAGlanceDonut data={overallSentimentData} />
          }
          body={
            <div>
              Your meeting followed an average distribution across negative,
              neutral, and positive sentiment.
            </div>
          }
          action={<a href="#">Details</a>}
        />
        <MeetingSentimentAtAGlanceItem
          chart={<VMeetingSentimentAtAGlanceBigNumberTotal data={71} />}
          body={
            <div>
              Your meeting did not generate an average number of sentiment for
              the amount of time.
            </div>
          }
          action={<a href="#">Solutions</a>}
        />
        <MeetingSentimentAtAGlanceItem
          chart={<VMeetingSentimentAtAGlanceBigNumberParticipants data={25} />}
          body={
            <div>This is below the normal average for a 90 minute meeting</div>
          }
          action={<a href="#">Solutions</a>}
        />
      </Space>
    </Space>
  );
}

export default MeetingSentimentAtAGlance;
