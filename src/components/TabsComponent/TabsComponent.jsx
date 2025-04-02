import { Tabs } from "antd";
import SearchPanel from "../SearchPanel/SearchPanel";
import MovieRated from "../MovieRated/MovieRated";
import MoviesList from "../MoviesList/MoviesList";

const TabsComponent = () => {
  const itemsTabs = [
    {
      label: "Search",
      key: "1",
      children: (
        <>
          <SearchPanel />
          <MoviesList />
        </>
      ),
    },
    {
      label: "Rated",
      key: "2",
      children: <MovieRated />,
    },
  ];

  return <Tabs defaultActiveKey="1" size="large" centered items={itemsTabs} />;
};

export default TabsComponent;
