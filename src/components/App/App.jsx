import "./App.css";

import Layout from "../Layout/Layout";
import { MovieProvider } from "../context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <Layout />
    </MovieProvider>
  );
}

export default App;
