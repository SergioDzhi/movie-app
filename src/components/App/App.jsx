import "./App.css";
import MoviesList from "../MoviesList/MoviesList";
import { useState } from "react";
import SearchPanel from "../SearchPanel/SearchPanel";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (query = "", page = 1) => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=aa5fb7ef4978a005b1aba2e36514bb64&query=${query}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=aa5fb7ef4978a005b1aba2e36514bb64&page=${page}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Ошибка загрузки фильмов");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value.trim().length > 0) {
      setCurrentPage(1);
      fetchMovies(value, 1);
    } else {
      fetchMovies("", currentPage);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);

    fetchMovies(searchInput, page);
  };

  return (
    <>
      <Header />
      <SearchPanel handleSearch={handleSearch} />
      <MoviesList
        movies={movies}
        loading={loading}
        error={error}
        fetchMovies={fetchMovies}
      />
      <Footer
        currentPage={currentPage}
        total={50}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
