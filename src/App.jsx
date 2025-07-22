import ChooseWords from "./ChooseWords/ChooseWords";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./TestPage/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ChooseWords />} path="/"></Route>
        <Route element={<TestPage></TestPage>} path="/type-test"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
