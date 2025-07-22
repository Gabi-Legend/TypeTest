import styles from "./TestPage.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function TestPage() {
  const location = useLocation();
  const { words: wordCount } = location.state || { words: 10 };

  const [words, setWords] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (testStarted) {
      fetch(`https://random-word-api.herokuapp.com/word?number=${wordCount}`)
        .then((res) => res.json())
        .then((data) => {
          setWords(data);
          setStatuses(Array(data.length).fill(""));
          setCurrentInput("");
          setCurrentIndex(0);
          setCorrectCount(0);
          setStartTime(Date.now());
          setEndTime(null);
        });
    }
  }, [testStarted]);

  const handleChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentInput.trim();
      const expected = words[currentIndex];

      const newStatuses = [...statuses];
      if (trimmed === expected) {
        newStatuses[currentIndex] = "correct";
        setCorrectCount((prev) => prev + 1);
      } else {
        newStatuses[currentIndex] = "wrong";
      }

      setStatuses(newStatuses);
      setCurrentInput("");
      setCurrentIndex((prev) => prev + 1);

      if (currentIndex + 1 === words.length) {
        setEndTime(Date.now());
      }
    }
  };

  const handleRetry = () => {
    setTestStarted(false);
    setWords([]);
    setStatuses([]);
    setCurrentInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setCorrectCount(0);
  };

  const getWPM = () => {
    if (!startTime || !endTime) return 0;
    const minutes = (endTime - startTime) / 1000 / 60;
    return Math.round(correctCount / minutes);
  };

  return (
    <div className={styles.testContainer}>
      <h1>Type Test</h1>
      <p>Words to type: {wordCount}</p>

      {!testStarted ? (
        <button onClick={() => setTestStarted(true)}>🚀 Start Test</button>
      ) : (
        <>
          <div className={styles.wordsBox}>
            {words.map((word, i) => {
              let className = styles.word;
              if (i === currentIndex) className += ` ${styles.current}`;
              else if (statuses[i] === "correct")
                className += ` ${styles.correct}`;
              else if (statuses[i] === "wrong") className += ` ${styles.wrong}`;

              return (
                <span key={i} className={className}>
                  {word}
                </span>
              );
            })}
          </div>

          {endTime ? (
            <div className={styles.results}>
              <p>✅ Test completed!</p>
              <p>⏱ Time: {((endTime - startTime) / 1000).toFixed(2)}s</p>
              <p>💨 WPM: {getWPM()}</p>
              <button onClick={handleRetry}>🔁 Retry</button>
            </div>
          ) : (
            <input
              type="text"
              className={styles.input}
              value={currentInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Start typing..."
              autoFocus
            />
          )}
        </>
      )}
    </div>
  );
}

export default TestPage;
