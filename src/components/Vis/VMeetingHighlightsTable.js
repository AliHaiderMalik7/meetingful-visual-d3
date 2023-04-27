import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { max } from "d3";
import { useCallback, useMemo, useState } from "react";
import { INSIGHTS_ACCESSORS } from "./constants";
import { generateMeetingHighlightsTableData } from "./helpers";
import VMeetingHighlightsTableTimeAxis from "./VMeetingHighlightsTableTimeAxis";
import VMeetingHighlightsTableTimeline from "./VMeetingHighlightsTableTimeline";
import VMeetingHighlightsTableExpandedTable from "./VMeetingHighlightsTableExpandedTable";
import styles from "./VMeetingHighlightsTable.module.css";

const { Column } = Table;

const MIN_TABLE_WIDTH = 640;

const scrollElementIntoView = (id) => {
  // The implementation depends on AntD table DOM structure and class names. It might break if AntD changes them.
  const scrollItem = document.getElementById(id)?.closest("td.ant-table-cell");
  if (!scrollItem) return;
  const scrollContainer = scrollItem.closest("div.ant-table-body");
  if (!scrollContainer) return;
  scrollContainer.scrollTo({ top: scrollItem.offsetTop, behavior: "smooth" });
};

const VMeetingHighlightsTable = ({ data, selected }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const xMax = useMemo(
    () => max(data, INSIGHTS_ACCESSORS.utteranceStart),
    [data]
  );
  const tableData = useMemo(
    () => generateMeetingHighlightsTableData(data, selected),
    [data, selected]
  );

  const handleClick = useCallback(
    (speaker, d) => {
      if (!expandedRowKeys.includes(speaker)) {
        setExpandedRowKeys((prev) => [...prev, speaker]);
        setTimeout(() => {
          scrollElementIntoView(d._id);
        }, 500);
      } else {
        scrollElementIntoView(d._id);
      }
    },
    [expandedRowKeys]
  );

  return (
    <Table
      className={`v ${styles.container}`}
      dataSource={tableData}
      rowKey="speaker"
      pagination={false}
      expandable={{
        expandedRowKeys,
        expandedRowRender: (record) => (
          <VMeetingHighlightsTableExpandedTable data={record.data} />
        ),
        expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <DownOutlined onClick={(e) => onExpand(record, e)} />
          ) : (
            <RightOutlined onClick={(e) => onExpand(record, e)} />
          ),
        onExpand: (expanded, record) => {
          if (expanded) {
            setExpandedRowKeys((prev) => [...prev, record.speaker]);
          } else {
            setExpandedRowKeys((prev) =>
              prev.filter((d) => d !== record.speaker)
            );
          }
        },
      }}
      sticky
      scroll={{
        x: MIN_TABLE_WIDTH,
      }}
    >
      <Column title="" dataIndex="speaker" key="speaker" width="240px"></Column>
      <Column
        title={<VMeetingHighlightsTableTimeAxis xMax={xMax} />}
        render={(_, record) => (
          <VMeetingHighlightsTableTimeline
            data={record}
            xMax={xMax}
            handleClick={handleClick}
          />
        )}
      ></Column>
    </Table>
  );
};

export default VMeetingHighlightsTable;
