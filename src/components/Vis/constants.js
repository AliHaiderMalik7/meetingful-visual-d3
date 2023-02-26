import { scaleOrdinal } from "d3";

export const INSIGHT_TYPES = ["opinion", "idea", "action_item"];

export const insightColor = scaleOrdinal()
  .domain(INSIGHT_TYPES)
  .range(INSIGHT_TYPES.map((d) => `var(--color-${d})`));

export const SENTIMENTS = ["positive", "neutral", "negative"];

export const sentimentColor = scaleOrdinal()
  .domain(SENTIMENTS)
  .range(SENTIMENTS.map((d) => `var(--color-${d})`));

export const INSIGHTS_ACCESSORS = {
  utteranceStart: (d) => new Date(d["utterance_start"]),
  speaker: (d) => d["speaker"],
  insightTypes: (d) => d["insight_types"],
  insights: (d) => d["insights"],
};

export const OVERALL_SENTIMENT_ACCESSORS = {
  positive: (d) => d["Positive Statements"],
  neutral: (d) => d["Neutral Statements"],
  negative: (d) => d["Negative Statements"],
};

export const SENTIMENT_FLOW_ACCESSORS = {
  id: (d) => d["sentence_uid"],
  startTime: (d) => d["startTime"],
  duration: (d) => d["duration"],
  sentiment: (d) => d["sentiment"].toLowerCase(),
  isKeySentence: (d) => d["is_key_sentence"],
  speaker: (d) => d["speaker"],
  text: (d) => d["text"],
  keyPhrases: (d) => d["key_phrase_in_sentence_list"],
};

export const TOP_PHRASE_SENTENCE_SENTIMENT_ACCESSORS = {
  topic: (d) => d["phrase"],
  sentenceIds: (d) => d["sent_uid_list"],
};

export const CLUSTER_PHRASE_ACCESSORS = {
  clusterName: (d) => d["cluster_name"],
  phrases: (d) => d["phrase_list"],
  frequencies: (d) => d["phrase_frequency_list"],
  sentenceIds: (d) => d["sentence_uid_list_list"],
};
