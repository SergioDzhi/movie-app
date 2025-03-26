import { Input } from "antd";
const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};
const SearchPanel = ({ handleSearch }) => {
  const handleDebounce = debounce(handleSearch, 1000);

  return (
    <Input
      className="input"
      placeholder="Type to search..."
      onChange={(event) => handleDebounce(event)}
    />
  );
};

export default SearchPanel;
