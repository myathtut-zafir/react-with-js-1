import { useState } from "react";
import "./App.css";

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked?'Liked':"Like"}
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
