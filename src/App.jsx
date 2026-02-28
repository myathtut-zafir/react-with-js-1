import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You will
            enjoy{" "}
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
      </div>
    </div>
  );
};

export default App;
