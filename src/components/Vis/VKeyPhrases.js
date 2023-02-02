import { descending, sum, zip } from "d3";
import { useMemo } from "react";
import { CLUSTER_PHRASE_ACCESSORS } from "./constants";
import VBars from "./VBars";

const VKeyPhrases = ({ data }) => {
  const displayData = useMemo(() => {
    const displayData = data.map((d) => ({
      values: zip(
        CLUSTER_PHRASE_ACCESSORS.phrases(d),
        CLUSTER_PHRASE_ACCESSORS.frequencies(d)
      ).map(([phrase, frequency]) => ({
        key: phrase,
        value: frequency,
      })),
      total: sum(CLUSTER_PHRASE_ACCESSORS.frequencies(d)),
    }));
    displayData.sort((a, b) => descending(a.total, b.total));
    displayData.forEach((d, i) => (d.key = `Topic ${i + 1}`));
    return displayData;
  }, [data]);

  return <VBars data={displayData} />;
};

export default VKeyPhrases;
