import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Spin } from "antd";
import MoviesList from "../MoviesList/MoviesList";
import SearchPanel from "../SearchPanel/SearchPanel";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  const { loading } = useContext(MovieContext);

  return (
    <>
      {loading && <Spin fullscreen />}
      <Header />
      <SearchPanel />
      <MoviesList />
      <Footer />
    </>
  );
};

export default Layout;
