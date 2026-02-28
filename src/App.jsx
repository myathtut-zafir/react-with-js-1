import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMesssage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      console.log(API_KEY);
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      if (data.Response == "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You will
            enjoy{" "}
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40]">All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMesssage ? (
            <p className="text-white">{errorMesssage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <p className="text-white" key={movie.id}>
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>

        <h1>{searchTerm}</h1>
      </div>
    </div>
  );
};

export default App;
