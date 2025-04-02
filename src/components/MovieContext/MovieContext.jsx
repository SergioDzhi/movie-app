import { createContext, useState, useCallback, useContext } from "react";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [ratedMovieList, setRatedMovieList] = useState([]);

  const apiKey = "9718a16e318c9db8f2b10809b2c1cf17";
  const BASE_URL = "https://api.themoviedb.org/3";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzE4YTE2ZTMxOGM5ZGI4ZjJiMTA4MDliMmMxY2YxNyIsIm5iZiI6MTc0MTgwOTY3Mi4wNTMsInN1YiI6IjY3ZDFlODA4MzYwMjAyNjkwNjgxNzI4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qQLu_BcCYUWzBD9cGab2DwfbhWh6UwxoARSPM7kffLg";

  const createGuestSession = useCallback(async () => {
    try {
      const storedSessionId = localStorage.getItem("guest_session_id");
      if (storedSessionId) {
        setSessionId(storedSessionId);
        return storedSessionId;
      }
      const url = `${BASE_URL}/authentication/guest_session/new?api_key=${apiKey}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("guest_session_id", data.guest_session_id);
        setSessionId(data.guest_session_id);
        return data.guest_session_id;
      } else {
        throw new Error("Ошибка при создании гостевой сессии");
      }
    } catch (error) {
      console.error("Ошибка гостевой сессии:", error);
      setError(`Ошибка гостевой сессии: ${error.message}`);
      return null;
    }
  }, [BASE_URL, apiKey]);

  const fetchGenre = useCallback(async () => {
    try {
      const url = `${BASE_URL}/genre/movie/list?api_key=${apiKey}&language=ru`;
      const response = await fetch(url);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      setError(`Ошибка загрузки жанров: ${error.message}`);
    }
  }, [BASE_URL, apiKey]);

  const rateMovie = async (movieId, rating) => {
    if (!movieId) {
      console.error("Ошибка: movieId отсутствует!");
      return;
    }

    if (!sessionId) {
      console.error("Ошибка: sessionId отсутствует!");
      return;
    }

    const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ value: rating }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.success) {
        console.log("Фильм успешно оценен!");
      } else {
        console.error("Ошибка при оценке фильма:", data);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };
  const fetchMovies = useCallback(
    async (query = "", page = 1) => {
      setLoading(true);
      try {
        const guestSessionId = sessionId || (await createGuestSession());
        if (!guestSessionId) throw new Error("Не удалось получить sessionId");

        let url;
        if (query) {
          const encodedQuery = encodeURIComponent(query);
          url = `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodedQuery}&page=${page}`;
        } else {
          url = `${BASE_URL}/discover/movie?api_key=${apiKey}&page=${page}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        setError(`Ошибка загрузки фильмов: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [sessionId, createGuestSession, BASE_URL, apiKey]
  );

  const fetchRatedMovies = useCallback(async () => {
    try {
      const url = `${BASE_URL}/guest_session/${sessionId}/rated/movies?api_key=${apiKey}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setRatedMovieList(data.results || []);
      return data.results;
    } catch (error) {
      setError(`Ошибка загрузки оцененных фильмов: ${error.message}`);
    }
  }, [sessionId, BASE_URL, apiKey, TOKEN]);

  const handleSearch = useCallback(
    (event) => {
      const value = event.target.value;
      setSearchInput(value);
      setCurrentPage(1);
      fetchMovies(value, 1);
    },
    [fetchMovies]
  );

  const handlePageChange = useCallback(
    (page) => {
      if (page !== currentPage) {
        setCurrentPage(page);
        fetchMovies(searchInput, page);
      }
    },
    [fetchMovies, searchInput, currentPage]
  );

  const sliceText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        genres,
        loading,
        error,
        searchInput,
        currentPage,
        sessionId,
        ratedMovieList,
        handleSearch,
        handlePageChange,
        fetchMovies,
        fetchGenre,
        createGuestSession,
        sliceText,
        rateMovie,
        fetchRatedMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovieContext = () => useContext(MovieContext);
export { MovieContext, MovieProvider };
