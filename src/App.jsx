import "./App.css";


const Card = ({ title }) => {
  return (
    <div className="card">
      <h2>
        {title}
      </h2>
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
