import { useState } from "react";

import "./App.css";
import Data from "./Data";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Library</h1>
      <Data />
    </>
  );
}

export default App;
