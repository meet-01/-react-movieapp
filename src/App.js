import { useEffect, useState } from "react";
import Movie from "./components/Movie";

const featured =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c131c083bd12c0df0579e0f745bc36b0&page=1";
const searchIMG =
  "https://api.themoviedb.org/3/search/movie?&api_key=c131c083bd12c0df0579e0f745bc36b0&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch(featured)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(searchIMG + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search"
            placeholder="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
