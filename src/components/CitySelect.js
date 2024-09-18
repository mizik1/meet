import React, { useState } from "react";
import { getSuggestions } from "../api"; // Make sure the API function is imported

const CitySelect = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      // Fetch city suggestions based on user input
      getSuggestions(value).then((suggestions) => setSuggestions(suggestions));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleCitySelect = (city) => {
    setQuery(city); // Update the query with the selected city
    setSuggestions([]); // Clear the suggestions list
  };

  return (
    <div>
      {/* City Search Input */}
      <input type="text" placeholder="Search for a city" value={query} onChange={handleInputChange} />

      {/* Display city suggestions */}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} role="listitem" onClick={() => handleCitySelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelect;
