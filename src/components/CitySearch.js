import React, { useState } from "react";
import { getSuggestions } from "../api"; // Import the API function for fetching city suggestions

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState(""); // State for the search query
  const [suggestions, setSuggestions] = useState([]); // State for the city suggestions

  // Handle input change to update the query and fetch suggestions
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value); // Update the query state

    if (value) {
      // Fetch city suggestions based on the input value
      getSuggestions(value).then((suggestions) => setSuggestions(suggestions));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle the city suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Set the query to the selected suggestion
    setSuggestions([]); // Clear the suggestions after selection
    if (onCitySelect) {
      onCitySelect(suggestion); // Call the callback to notify the parent component
    }
  };

  return (
    <div>
      {/* Input field for searching cities */}
      <input
        type="text"
        placeholder="Search for a city"
        value={query} // Controlled input value
        onChange={handleInputChange} // Handle user input
      />

      {/* Display the city suggestions */}
      {suggestions.length > 0 && (
        <ul id="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
