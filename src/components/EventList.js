import React, { useState, useEffect } from "react";
import { getEvents } from "../api"; // Make sure this is correctly imported

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, []);

  return (
    <ul id="event-list">
      {events.map((event, index) => (
        <li key={index}>{event.name}</li>
      ))}
    </ul>
  );
};

export default EventList;
