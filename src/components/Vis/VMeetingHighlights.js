import { useMemo, useState } from "react";
import { Space } from "antd";
import VColorSwatches from "./VColorSwatches";
import VMeetingHighlightsTable from "./VMeetingHighlightsTable";
import { insightColor, INSIGHT_TYPES } from "./constants";

const VMeetingHighlights = ({ data }) => {
  const [selectedInsightTypes, setSelectedInsightTypes] =
    useState(INSIGHT_TYPES);

  const tableKey = useMemo(() => JSON.stringify(data), [data]);

  return (
    <Space direction="vertical" size={0} style={{ display: "flex" }}>
      <VColorSwatches
        color={insightColor}
        selected={selectedInsightTypes}
        setSelected={setSelectedInsightTypes}
      />
      <VMeetingHighlightsTable
        key={tableKey}
        data={data}
        selected={selectedInsightTypes}
      />
    </Space>
  );
};

export default VMeetingHighlights;
