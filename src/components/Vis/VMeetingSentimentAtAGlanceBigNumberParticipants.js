import VBigNumber from "./VBigNumber";

const VMeetingSentimentAtAGlanceBigNumberParticipants = ({ data = 0 }) => {
  return (
    <VBigNumber
      number={data.toFixed(0) + "%"}
      description="Participants who contributed sentiment"
    />
  );
};

export default VMeetingSentimentAtAGlanceBigNumberParticipants;
