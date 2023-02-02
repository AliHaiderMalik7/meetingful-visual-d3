import { useMemo } from "react";
import { Space } from "antd";
import { SENTIMENT_FLOW_ACCESSORS } from "./constants";
import VColorSwatchesSentiment from "./VColorSwatchesSentiment";
import VDotHistogram from "./VDotHistogram";
import styles from "./VSentimentMeetingTone.module.css";

const SentimentHotSpotLegend = () => {
  return <div className={styles.hotSpotLegend}>Sentiment Hot Spot</div>;
};

const VSentimentMeetingTone = ({ data, threshold }) => {
  const keySentencesData = useMemo(
    () => data.filter(SENTIMENT_FLOW_ACCESSORS.isKeySentence),
    [data]
  );

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <Space size="middle" align="center" wrap>
        <VColorSwatchesSentiment />
        <SentimentHotSpotLegend />
      </Space>
      <VDotHistogram data={keySentencesData} threshold={threshold} />
    </Space>
  );
};

export default VSentimentMeetingTone;
