import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Card, Typography, Space, Tag } from "antd";
const { Title, Paragraph, Text } = Typography;
import { ConfigProvider } from "antd";
import sliceText from "../utils/utils";
const MovieItem = ({
  movie: { title, release_date, overview, poster_path, genre_ids },
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            bodyPadding: 10,
            borderRadiusLG: 0,
            tabsMarginBottom: 0,
            colorBorderBg: "white",
          },
        },
      }}
    >
      <Card
        className="card"
        hoverable
        cover={
          <img
            className="coverImage"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        }
      >
        <Space className="space" direction="vertical">
          <Title className="title" level={5}>
            {title}
          </Title>
          <Text type="secondary">
            {release_date
              ? format(new Date(release_date), "MMMM dd, yyyy", {
                  locale: enGB,
                })
              : "Unknown Release Date"}
          </Text>

          <Space
            wrap
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            {genre_ids.slice(0, 3).map((genre) => (
              <Tag key={genre}>{genre}</Tag>
            ))}
          </Space>
          {sliceText(overview, 30) && (
            <Paragraph className="paragraph">
              {sliceText(overview, 30)}
            </Paragraph>
          )}
        </Space>
      </Card>
    </ConfigProvider>
  );
};

export default MovieItem;
