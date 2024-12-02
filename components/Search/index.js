import React from "react";
import { Search } from "react-bootstrap-icons";

const SearchBox = ({ onChange, onSearch, placeholder = "Search...", width = 200 }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  const subWidth = `${width - 30}px`;
  return (
    <div
      className="d-flex justify-content-between border rounded align-items-center px-1"
      style={{ width: `${width}px` }}
    >
      <input
        type="text"
        className="border border-0 search-input"
        placeholder={placeholder}
        style={{ width: subWidth }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <Search
        onClick={onSearch}
        className="pointer"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default SearchBox;
