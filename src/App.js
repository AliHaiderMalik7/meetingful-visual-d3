import { Card, ConfigProvider, Layout, Space, theme } from "antd";
import MeetingSentimentAtAGlance from "./components/MeetingDetails/MeetingSentimentAtAGlance";
import MeetingHighlights from "./components/MeetingDetails/MeetingHighlights";
import SentimentMeetingTone from "./components/MeetingDetails/SentimentMeetingTone";
import ParticipantSentiment from "./components/MeetingDetails/ParticipantSentiment";

// V.css contains shared styles for all visualization components
import "./components/Vis/V.css";

const { Sider, Content } = Layout;

function App() {
  const {
    token: { sizeLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Poppins', sans-serif",
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="v"
      >
        <Layout>
          <Sider
            width={250}
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            style={{
              background: "var(--color-primary-900)",
            }}
          ></Sider>
          <Content style={{ background: "#F5F5F5", padding: sizeLG }}>
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <Card>
                <MeetingSentimentAtAGlance />
              </Card>
              <Card>
                <SentimentMeetingTone />
              </Card>
              <Card>
                <ParticipantSentiment />
              </Card>
              <Card>
                <MeetingHighlights />
              </Card>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
