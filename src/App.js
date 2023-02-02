import { Card, ConfigProvider, Layout, Space, Tabs, theme } from "antd";
import MeetingSentimentAtAGlance from "./components/MeetingDetails/MeetingSentimentAtAGlance";
import MeetingDetailsTabSentimentAnalysis from "./components/MeetingDetails/TabSentimentAnalysis";
import MeetingDetailsTabKeyTopics from "./components/MeetingDetails/TabKeyTopics";

// V.css contains shared styles for all visualization components
import "./components/Vis/V.css";

const { Header, Sider, Content } = Layout;

function App() {
  const {
    token: { sizeLG },
  } = theme.useToken();

  const tabs = [
    {
      key: "tab-1",
      label: "Meeting Essentials",
      children: "Meeting Essentials",
    },
    {
      key: "tab-2",
      label: "Sentiment Analysis",
      children: <MeetingDetailsTabSentimentAnalysis />,
    },
    {
      key: "tab-3",
      label: "Key Topics",
      children: <MeetingDetailsTabKeyTopics />,
    },
  ];

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
        <Header
          style={{
            background: "var(--color-primary-900)",
          }}
        ></Header>
        <Layout>
          <Sider
            width={250}
            theme="light"
            breakpoint="lg"
            collapsedWidth="0"
          ></Sider>
          <Content style={{ background: "#F5F5F5", padding: sizeLG }}>
            <Space
              direction="vertical"
              size="large"
              style={{ display: "flex" }}
            >
              <MeetingSentimentAtAGlance />
              <Card>
                <Tabs defaultActiveKey="tab-3" centered items={tabs} />
              </Card>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
