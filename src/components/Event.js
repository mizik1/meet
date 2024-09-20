import React, { useState } from "react";

const Event = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false); // By default, details are collapsed

  // Toggle function to show/hide event details
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="event">
      {/* Event Summary */}
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>

      {/* Button to toggle details */}
      <button onClick={toggleDetails}>{isExpanded ? "Hide Details" : "Show Details"}</button>

      {/* Conditionally render the event details based on isExpanded */}
      {isExpanded && (
        <div className="event-details">
          <p>{event.description}</p>
          <p>Organizer: {event.organizer}</p>
        </div>
      )}
    </div>
  );
};

export default Event;
