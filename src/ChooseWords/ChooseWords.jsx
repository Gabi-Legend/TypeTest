import styles from "./ChooseWords.module.css";

function ChooseWords() {
  return (
    <div>
      <h1>Type Test</h1>
      <p>Choose the length of the test</p>
      <div>
        <label>Words : </label>
        <input type="number" max={100} min={10} />
      </div>
      <button>Start Test</button>
    </div>
  );
}

export default ChooseWords;
