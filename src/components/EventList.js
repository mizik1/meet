import React, { useState, useEffect } from "react";
import { getEvents } from "../_mocks_/api";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => setEvents(events));
  }, []);

  return (
    <ul id="event-list" role="list">
      {events.map((event) => (
        <li key={event.id} role="listitem">
          {event.name} - {event.city}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
