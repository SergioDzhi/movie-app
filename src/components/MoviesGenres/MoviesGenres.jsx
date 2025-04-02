import { useMovieContext } from "../MovieContext/MovieContext";
import { Typography, Tag } from "antd";

function MoviesGenres({ genre_ids }) {
  const { genres } = useMovieContext();

  return (
    <Typography.Text
      wrap="true"
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      {genres.length > 0 &&
        genre_ids.slice(0, 2).map((genreId) => {
          const genre = genres.find((g) => g.id === genreId);
          if (genre) {
            const name =
              genre.name.charAt(0).toUpperCase() +
              genre.name.slice(1).toLowerCase();
            return <Tag key={genre.id}>{name}</Tag>;
          }
          return null;
        })}
    </Typography.Text>
  );
}
export default MoviesGenres;
