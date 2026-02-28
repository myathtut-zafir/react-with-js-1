import { useEffect, useState } from "react";
import "./App.css";

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`${title} has been liked ${hasLiked}`);
    // console.log(`${title} has been liked ${count}`);
  }, [hasLiked]);

  return (
    <div
      className="card"
      onClick={() => setCount((prevState) => prevState + 1)}
    >
      <h2>
        {title} - {count || null}
      </h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
};
function App() {
  return (
    <div className="card-container">
      <Card title="A" />
      <Card title="B" />
      <Card title="C" />
    </div>
  );
}

export default App;
