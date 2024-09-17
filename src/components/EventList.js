import React, { useState, useEffect } from "react";
import { getEvents, getSuggestions } from "../api"; // Ensure the API functions are imported

const EventList = () => {
  const [events, setEvents] = useState([]); // State for events
  const [query, setQuery] = useState(""); // State for city query input
  const [suggestions, setSuggestions] = useState([]); // State for city suggestions

  // Fetch all events when the component is mounted
  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, []);

  // Handle input change and fetch city suggestions
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value); // Update query state with user input

    if (value) {
      // Fetch city suggestions when input is not empty
      getSuggestions(value).then((suggestions) => setSuggestions(suggestions));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  return (
    <div>
      {/* City Search Input */}
      <input
        type="text"
        placeholder="Search for a city"
        value={query} // Controlled input bound to query state
        onChange={handleInputChange} // Handle user input
      />

      {/* Display city suggestions */}
      <ul id="suggestions-list">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)
        ) : (
          <li>No suggestions available</li> // Fallback when no suggestions are present
        )}
      </ul>

      {/* Display events */}
      <ul id="event-list">
        {events.length > 0 ? (
          events.map((event, index) => <li key={index}>{event.name}</li>)
        ) : (
          <li>No events available</li> // Fallback for when there are no events
        )}
      </ul>
    </div>
  );
};

export default EventList;
