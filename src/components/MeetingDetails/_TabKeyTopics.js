import { Space } from "antd";
import VKeyPhrases from "../Vis/VKeyPhrases";

import clusterPhraseData from "../../data/cluster_phrase.json";

const TabKeyTopics = () => {
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
          Key Phrases
        </h2>
        <VKeyPhrases data={clusterPhraseData} />
      </Space>
    </>
  );
};

export default TabKeyTopics;
