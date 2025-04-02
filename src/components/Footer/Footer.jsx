import { Pagination } from "antd";
import { ConfigProvider } from "antd";
import { useContext } from "react";
import { MovieContext } from "../MovieContext/MovieContext";
const Footer = () => {
  const { currentPage, handlePageChange } = useContext(MovieContext);

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemSize: 24,
          },
        },
        token: {
          itemSizeSM: 24,
          colorPrimary: "#1677ff",
          margin: 37,
        },
      }}
    >
      <Pagination
        align="center"
        current={currentPage}
        total={50}
        onChange={handlePageChange}
      />
    </ConfigProvider>
  );
};

export default Footer;
