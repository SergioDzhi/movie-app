import "./App.css";

import Layout from "../Layout/Layout";
import { MovieProvider } from "../MovieContext/MovieContext";

function App() {
  return (
    <MovieProvider>
      <Layout />
    </MovieProvider>
  );
}

export default App;
