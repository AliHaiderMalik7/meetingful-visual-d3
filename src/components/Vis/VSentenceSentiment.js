import { utcFormat } from "d3";
import Highlighter from "react-highlight-words";
import { SENTIMENT_FLOW_ACCESSORS } from "./constants";
import styles from "./VSentenceSentiment.module.css";

const formatTime = (d) => utcFormat("%H:%M:%S")(new Date(d));

const VSentenceSentiment = ({ d }) => {
  const speaker = SENTIMENT_FLOW_ACCESSORS.speaker(d);
  const startTime = formatTime(SENTIMENT_FLOW_ACCESSORS.startTime(d));
  const keyPhrases = SENTIMENT_FLOW_ACCESSORS.keyPhrases(d);
  const text = SENTIMENT_FLOW_ACCESSORS.text(d);
  const sentiment = SENTIMENT_FLOW_ACCESSORS.sentiment(d);

  return (
    <div className={`v ${styles.container}`}>
      <div className={styles.speaker}>{speaker}</div>
      <div className={styles.startTime}>
        <svg className={styles.timeIcon} viewBox="0 0 24 24">
          <path
            d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM16.7277 15.6884L15.9616 16.733C15.9449 16.7558 15.924 16.775 15.8998 16.7896C15.8757 16.8042 15.8489 16.8139 15.8211 16.8182C15.7932 16.8224 15.7648 16.8211 15.7374 16.8143C15.71 16.8075 15.6843 16.7954 15.6616 16.7786L11.2312 13.5482C11.2036 13.5284 11.1812 13.5022 11.1658 13.4719C11.1504 13.4416 11.1426 13.4081 11.1429 13.3741V6C11.1429 5.88214 11.2393 5.78571 11.3571 5.78571H12.6455C12.7634 5.78571 12.8598 5.88214 12.8598 6V12.6295L16.6795 15.3911C16.7759 15.458 16.7973 15.592 16.7277 15.6884Z"
            fill="currentColor"
          ></path>
        </svg>
        {startTime}
      </div>
      <div className={styles.text}>
        <Highlighter
          highlightClassName={styles[sentiment]}
          searchWords={keyPhrases}
          autoEscape
          textToHighlight={text}
        />
      </div>
    </div>
  );
};

export default VSentenceSentiment;
