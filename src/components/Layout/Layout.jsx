import { useContext } from "react";
import { MovieContext } from "../MovieContext/MovieContext";
import { Spin } from "antd";

import TabsComponent from "../TabsComponent/TabsComponent";
import Footer from "../Footer/Footer";

const Layout = () => {
  const { loading } = useContext(MovieContext);

  return (
    <>
      {loading && <Spin fullscreen />}
      <TabsComponent />
      <Footer />
    </>
  );
};

export default Layout;
