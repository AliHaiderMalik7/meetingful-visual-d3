import { forwardRef, memo, useCallback, useRef, useState } from "react";
import { format } from "d3";
import { SENTIMENT_FLOW_ACCESSORS } from "./constants";
import VTooltip from "./VTooltip";
import VSentenceSentiment from "./VSentenceSentiment";
import styles from "./VWaffleSentiment.module.css";

const formatCount = format(",");

const Group = memo(({ data, setD }) => {
  return (
    <div className={styles.group}>
      <div className={styles.groupName}>
        <div>
          {data.groupKey} <span>({formatCount(data.total)})</span>
        </div>
        <div>
          <span>
            {data.sentiments.map((d, i) => (
              <span key={d.sentiment}>
                {i ? " + " : ""}
                <span
                  style={{ backgroundColor: `var(--color-${d.sentiment})` }}
                  className={styles.groupNameCountBreakdownItem}
                >
                  {formatCount(d.sentences.length)}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={styles.groupSentiments}>
        {data.sentiments.map((d) => (
          <GroupSentiment key={d.sentiment} data={d.sentences} setD={setD} />
        ))}
      </div>
    </div>
  );
});

const GroupSentiment = memo(({ data, setD }) => {
  return (
    <div className={styles.groupSentiment}>
      {data.map((d) => (
        <WaffleRect key={SENTIMENT_FLOW_ACCESSORS.id(d)} d={d} setD={setD} />
      ))}
    </div>
  );
});

const WaffleRect = memo(({ d, setD }) => {
  const handlePointerEnter = useCallback(() => {
    setD(d);
  }, [d, setD]);

  const handlePointerLeave = useCallback(() => {
    setD(null);
  }, [setD]);
  return (
    <div
      className={styles.waffleRect}
      style={{
        background: `var(--color-${SENTIMENT_FLOW_ACCESSORS.sentiment(d)})`,
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    ></div>
  );
});

const Tooltip = forwardRef(({ d }, ref) => {
  return (
    <VTooltip ref={ref} isVisible={!!d}>
      {d && <VSentenceSentiment d={d} />}
    </VTooltip>
  );
});

const VWaffleSentiment = ({ data }) => {
  const ref = useRef(null);

  const [d, setD] = useState(null);

  return (
    <div ref={ref} className={`v ${styles.container}`}>
      {data.map((d) => (
        <Group key={d.groupKey} data={d} setD={setD} />
      ))}
      <Tooltip ref={ref} d={d} />
    </div>
  );
};

export default VWaffleSentiment;
