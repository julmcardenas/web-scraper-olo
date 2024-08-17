import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import axios from "axios";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:5001/api/products");
      console.log(response.data);
    }
    getData();
  }, []);

  return (
    <>
      <h1> hello from react</h1>
    </>
  );
}

export default App;
