import styles from "./ChooseWords.module.css";

function ChooseWords() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Type Test</h1>
      <p className={styles.desc}>Choose the length of the test</p>
      <div>
        <label>Words : </label>
        <input type="number" max={100} min={10} />
      </div>
      <button className={styles.startButton}>Start Test</button>
    </div>
  );
}

export default ChooseWords;
