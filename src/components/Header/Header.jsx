import { Tabs } from "antd";
import { ConfigProvider } from "antd";

const Header = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemGutter: 16,
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Search",
            key: "1",
          },
          {
            label: "Rated",
            key: "2",
          },
        ]}
        centered="true"
      ></Tabs>
    </ConfigProvider>
  );
};

export default Header;
