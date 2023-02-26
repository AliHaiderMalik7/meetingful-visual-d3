import { Space, Table } from "antd";
import { INSIGHTS_ACCESSORS } from "./constants";
import VMeetingTime from "./VMeetingTime";
import VMeetingHighlightsInsightsPie from "./VMeetingHighlightsInsightsPie";
import styles from "./VMeetingHighlightsTableExpandedTable.module.css";

const { Column } = Table;
const PIE_SIZE = 20;

const Row = ({ d }) => {
  return (
    <Space direction="vertical" id={d._id}>
      <div className={styles.header}>
        <svg
          width={PIE_SIZE}
          height={PIE_SIZE}
          viewBox={`${-PIE_SIZE / 2} ${-PIE_SIZE / 2} ${PIE_SIZE} ${PIE_SIZE}`}
          className={styles.pieSvg}
        >
          <VMeetingHighlightsInsightsPie
            data={INSIGHTS_ACCESSORS.insightTypes(d)}
            size={PIE_SIZE}
          />
        </svg>
        <div className={styles.speaker}>{INSIGHTS_ACCESSORS.speaker(d)}</div>
        <VMeetingTime time={INSIGHTS_ACCESSORS.utteranceStart(d)} />
      </div>
      <Space direction="vertical" size="small">
        {INSIGHTS_ACCESSORS.insights(d).map((insight, i) => (
          <div key={i} className={styles.insight}>
            {insight}
          </div>
        ))}
      </Space>
    </Space>
  );
};

const VMeetingHighlightsTableExpandedTable = ({ data }) => {
  return (
    <Table
      dataSource={data}
      rowKey="utterance_start"
      pagination={false}
      showHeader={false}
      scroll={{
        y: 400,
      }}
    >
      <Column title="" key="entry" render={(_, record) => <Row d={record} />} />
    </Table>
  );
};

export default VMeetingHighlightsTableExpandedTable;
