import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Card, Typography, Space, Image, ConfigProvider } from "antd";

import ProgressCircle from "../ProgressCircle/ProgressCircle";
import MoviesGenres from "../MoviesGenres/MoviesGenres";
import { RateComponent } from "../RateComponent/RateComponent";
import { useMovieContext } from "../MovieContext/MovieContext";

const { Title, Paragraph, Text } = Typography;

const MovieItem = ({ movie }) => {
  const { sliceText } = useMovieContext();
  const {
    id,
    title,
    release_date,
    overview,
    poster_path,
    genre_ids,
    vote_average,
  } = movie;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            bodyPadding: 0,
            borderRadiusLG: 0,
            tabsMarginBottom: 0,
            colorBorderBg: "white",
          },
          Typography: {
            titleMarginBottom: 0,
          },
          Rate: {
            starSize: 16,
          },
          Progress: {
            defaultColor: "yellow",
          },
        },
      }}
    >
      <Card
        className="card"
        hoverable
        cover={
          <Image
            className="coverImage"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={183}
            fallback="/placeholder.jpg"
          />
        }
      >
        <Space className="space" direction="vertical">
          <Title className="title" level={5}>
            {title}
            <ProgressCircle vote_average={vote_average || 0} />{" "}
          </Title>
          <MoviesGenres genre_ids={genre_ids} />
          <Text type="secondary">
            {release_date
              ? format(new Date(release_date), "MMMM dd, yyyy", {
                  locale: enGB,
                })
              : "Unknown Release Date"}
          </Text>
          {overview && (
            <Paragraph className="paragraph">
              {sliceText(overview, 20)}
            </Paragraph>
          )}
          <RateComponent movieId={id} />
        </Space>
      </Card>
    </ConfigProvider>
  );
};

export default MovieItem;
