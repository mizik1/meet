import React, { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [inputValue, setInputValue] = useState(currentNOE);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setCurrentNOE(Number(value)); // Update the parent component with the new value
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input type="number" id="number-of-events-input" value={inputValue} onChange={handleInputChange} min="1" />
    </div>
  );
};

export default NumberOfEvents;
