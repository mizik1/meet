import React from "react";
import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events.length > 0 ? (
        events.map((event, index) => <Event key={index} event={event} />)
      ) : (
        <li>No events available</li> // Fallback for when there are no events
      )}
    </ul>
  );
};

export default EventList;
