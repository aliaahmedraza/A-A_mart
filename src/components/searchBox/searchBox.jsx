import React, {  useState } from "react";
import "./searchBox.css";
import { Empty } from "antd";

function SearchBox() {
  const [suggestions, setSuggestions] = useState([]);
  const cities = [
    "Laptop",
    "Perfume",
    "Shirts",
    "Cloths",
    "Belt",
    "HandFree",
    "Ear Buds",
    "Tabs",
    "Body spray",
    "Mens Garments",
    "Underewear",
    "Rings",
  ];

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length > 0) {
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(<Empty/>);
    }
  };

  return (
    <div className="flex flex-col mt-2 search-container h-10 relative">
      <input
        type="text"
        className="search-box rounded-lg text-sm pl-2 h-52 w-[70rem]"
        placeholder="Search products"
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <div className="suggestions-box rounded-lg bg-[#F5F5F5] shadow-md mt-12 absolute z-10 ">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
