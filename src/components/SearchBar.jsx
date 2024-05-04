import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults, products }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const inputWrapperStyle = {
    width: "75%",
    height: "2.5rem",
    border: "none",
    borderRadius: "10px",
    padding: "0 15px",
    boxShadow: "0px 0px 8px #aaa",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = {
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    fontSize: "1.25rem",
    width: "100%",
    marginLeft: "5px",
  };

  const searchIconStyle = {
    color: "royalblue",
  };

  return (
    <div style={inputWrapperStyle} className='text-4xl font-extrabold sm:text-5xl md:text-2xl mx-auto'>
      <FaSearch style={searchIconStyle} />
      <input
        style={inputStyle}
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
