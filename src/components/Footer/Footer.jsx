import { Pagination } from "antd";
import { ConfigProvider } from "antd";
const Footer = ({ currentPage, total, onPageChange }) => {
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
        total={total}
        onChange={onPageChange}
      />
    </ConfigProvider>
  );
};

export default Footer;
