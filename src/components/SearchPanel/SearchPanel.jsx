import { Input } from "antd";
import debounce from "lodash.debounce";
import { useContext, useCallback } from "react";
import { MovieContext } from "../MovieContext/MovieContext";
import "./SearchPanel.css";

const SearchPanel = () => {
  const { handleSearch } = useContext(MovieContext);

  const handleDebounce = useCallback(debounce(handleSearch, 1000), [
    handleSearch,
  ]);

  return (
    <Input
      style={{ padding: 11 }}
      className="searchPanel"
      placeholder="Type to search..."
      onChange={handleDebounce}
      autoFocus
    />
  );
};

export default SearchPanel;
