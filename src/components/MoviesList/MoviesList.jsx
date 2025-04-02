import { useEffect } from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Alert } from "antd";
import { useMovieContext } from "../MovieContext/MovieContext";

const MoviesList = () => {
  const { fetchGenre, movies, fetchMovies, genres, loading, error  } =
    useMovieContext();

  useEffect(() => {
    if (movies.length === 0) fetchMovies();
  }, [fetchMovies, movies]);

  useEffect(() => {
    if (genres.length === 0) fetchGenre();
  }, [fetchGenre, genres]);



  return (
    <ul className="moviesList">
      {movies.length === 0 && !loading && (
        <Alert message="По вашему запросу ничего не найдено" type="info" />
      )}
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
      {error && (
        <Alert message="Ошибка загрузки" description={error} type="error" />
      )}
    </ul>
  );
};

export default MoviesList;
