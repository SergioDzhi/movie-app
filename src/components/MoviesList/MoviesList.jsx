import { useEffect, useContext } from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Alert } from "antd";
import { MovieContext } from "../context/MovieContext";
const MoviesList = () => {
  const {
    movies,
    fetchMovies,

    loading,
    error,
  } = useContext(MovieContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <ul className="moviesList">
      {movies.length === 0 && !loading && (
        <Alert
          className="alertNotFound"
          message="По вашему запросу ничего не найдено"
          type="info"
        />
      )}
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
      {error && (
        <Alert
          className="alert"
          message="Ошибка загрузки"
          description={error}
          type="error"
        />
      )}
    </ul>
  );
};

export default MoviesList;
