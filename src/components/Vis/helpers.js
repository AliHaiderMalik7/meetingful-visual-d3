import { ascending, group, intersection } from "d3";
import { INSIGHTS_ACCESSORS } from "./constants";

export const generateMeetingHighlightsTableData = (data, selected) => {
  const filtered = data
    .filter(
      (d) => intersection(INSIGHTS_ACCESSORS.insightTypes(d), selected).size > 0
    )
    .sort((a, b) =>
      ascending(
        INSIGHTS_ACCESSORS.utteranceStart(a),
        INSIGHTS_ACCESSORS.utteranceStart(b)
      )
    );
  const grouped = group(filtered, INSIGHTS_ACCESSORS.speaker);
  const tableData = [
    {
      speaker: "All Participants",
      data: filtered.map((d, j) => ({ ...d, _id: `insights-1-${j + 1}` })),
    },
    ...[...grouped.entries()]
      .sort(([a], [b]) => ascending(a, b))
      .map(([speaker, data], i) => ({
        speaker,
        data: data.map((d, j) => ({ ...d, _id: `insight-${i + 1}-${j + 1}` })),
      })),
  ];
  return tableData;
};
