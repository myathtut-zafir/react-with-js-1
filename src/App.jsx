import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./supabase";
import TrendingMovies from "./components/TrendingMovies";

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
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [topMovies, setTopMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

      // Track search in Supabase if user typed a query
      if (query && data.results && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const { data } = await getTrendingMovies();
      if (data) setTopMovies(data);
    };
    loadTrendingMovies();
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
        <TrendingMovies trendingMovies={topMovies} />
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
                  <MovieCard key={movie.id} movie={movie} />
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
