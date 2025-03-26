import { useEffect } from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Spin, Alert } from "antd";

const MoviesList = ({ movies, fetchMovies, loading, error }) => {
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Spin className="spin" spinning={loading}>
      {error && (
        <Alert
          className="alert"
          message="Ошибка загрузки"
          description={error}
          type="error"
        />
      )}

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
      </ul>
    </Spin>
  );
};

export default MoviesList;
