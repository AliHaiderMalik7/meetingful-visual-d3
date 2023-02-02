import styles from "./VBigNumber.module.css";

function VBigNumber({ number, description }) {
  return (
    <div className={`v ${styles.container}`}>
      <div className={styles.number}>{number}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

export default VBigNumber;
