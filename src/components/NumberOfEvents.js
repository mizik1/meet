import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32); // Default value is 32

  const handleInputChanged = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value <= 0) {
      setErrorAlert("Only positive numbers are allowed");
    } else {
      setErrorAlert(""); // Reset error if the input is valid
      setNumber(value);
      setCurrentNOE(value); // Update the number of events to display
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number">Number of Events:</label>
      <input type="number" id="number" className="number-input" value={number} onChange={handleInputChanged} />
    </div>
  );
};

export default NumberOfEvents;
