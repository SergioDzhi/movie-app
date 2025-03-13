import { useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=aa5fb7ef4978a005b1aba2e36514bb64";

  const truncText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }

    return text;
  };

  const getMovie = async () => {
    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data.results);

      setMovies(data.results);
      setIsFetched(true);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов", error);
    }
  };
  if (!isFetched) {
    getMovie();
  }

  return (
    <div className="moviesList">
      {movies.map((movie) => (
        <div key={movie.id} className="movieCard">
          <div className="movieImage">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movieDetails">
            <h3 className="movieTitle">{movie.title}</h3>
            <p className="movieYear">
              {format(new Date(movie.release_date), "MMMM dd, yyyy", {
                locale: enGB,
              })}
            </p>
            <p className="movieOverview">{truncText(movie.overview, 250)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
