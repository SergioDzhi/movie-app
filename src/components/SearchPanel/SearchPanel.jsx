import { Input } from "antd";

import debounce from "lodash.debounce";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import "./SearchPanel.css";

const SearchPanel = () => {
  const { handleSearch } = useContext(MovieContext);
  const handleDebounce = debounce(handleSearch, 1000);

  return (
    <Input
      className="searchPanel"
      placeholder="Type to search..."
      onChange={(event) => handleDebounce(event)}
      autoFocus
    />
  );
};

export default SearchPanel;
