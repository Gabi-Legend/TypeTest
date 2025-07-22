import styles from "./ChooseWords.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ChooseWords() {
  const navigate = useNavigate();
  const [words, handleWordsChange] = useState(15);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Type Test</h1>
      <p className={styles.desc}>Choose the length of the test</p>
      <div>
        <label>Words : </label>
        <input
          type="number"
          max={100}
          min={10}
          value={words}
          onChange={(e) => {
            handleWordsChange(e.target.value);
          }}
        />
      </div>
      <button
        className={styles.startButton}
        onClick={() => {
          if (words) {
            navigate("/type-test", { state: { words } });
          } else {
            alert("Choose how many words you want!");
          }
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default ChooseWords;
