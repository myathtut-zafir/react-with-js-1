import "./App.css";

const Card = ({ title }) => {
  return (
    <div style={{
      border:'1px solid #4b5362',
      padding:'20px',
      margin:'10px',
      backgroundColor:'#31363f',
      borderRadius:'10px',
      minHeight:'100px'
      }}>
      <h2>{title}</h2>
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
