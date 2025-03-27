import { createContext, useState, useCallback } from "react";

export const MovieContext = createContext({
  movies: [],
  loading: false,
  error: null,
  searchInput: "",
  currentPage: 1,
  fetchMovies: () => {},
  handleSearch: () => {},
  handlePageChange: () => {},
});

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = useCallback(async (query = "", page = 1) => {
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
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

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
    if (page !== currentPage) {
      setCurrentPage(page);

      fetchMovies(searchInput, page);
    }
  };
  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,
        setSearchInput,
        currentPage,
        setCurrentPage,
        handleSearch,
        handlePageChange,
        fetchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
