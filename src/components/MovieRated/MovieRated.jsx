import { useMovieContext } from "../MovieContext/MovieContext";
import { Alert } from "antd";
import { useEffect } from "react";
import MovieItem from "../MovieItem/MovieItem";

const MovieRated = () => {
  const { fetchRatedMovies, ratedMovieList, loading, error } =
    useMovieContext();

  useEffect(() => {
    if (ratedMovieList.length === 0) fetchRatedMovies();
  }, [fetchRatedMovies, ratedMovieList]);

  return (
    <ul className="moviesRatedList">
      {ratedMovieList.length === 0 && !loading && (
        <Alert message="По вашему запросу ничего не найдено" type="info" />
      )}
      {ratedMovieList.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
      {error && (
        <Alert message="Ошибка загрузки" description={error} type="error" />
      )}
    </ul>
  );
};

export default MovieRated;
