import { Rate } from "antd";
import { useMovieContext } from "../MovieContext/MovieContext";

export const RateComponent = ({ movieId }) => {
  const { rateMovie, ratedMovieList } = useMovieContext();

  const ratedMovie = ratedMovieList.find((movie) => movie.id === movieId);
  const movieRating = ratedMovie ? ratedMovie.rating : 0;

  return (
    <Rate
      className="stars"
      allowHalf
      count={10}
      value={movieRating}
      onChange={(value) => rateMovie(movieId, value)}
    />
  );
};
