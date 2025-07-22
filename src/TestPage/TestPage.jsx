import styles from "./TestPage.module.css";
import { useLocation } from "react-router-dom";

function TestPage() {
  const location = useLocation();
  const { words } = location.state;
  return (
    <>
      <div>
        <h1>Type Test</h1>
        <p>Words : {words}</p>
        <button>Start Test</button>
      </div>
    </>
  );
}

export default TestPage;
