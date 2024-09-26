import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events
  const [allLocations, setAllLocations] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE)); // Limit events based on currentNOE
    setAllLocations(extractLocations(allEvents)); // Extract unique locations
    setFilteredEvents(allEvents.slice(0, currentNOE)); // Initialize with all events
  };

  const handleCitySearch = (city) => {
    const filtered = events.filter((event) => event.location === city);
    setFilteredEvents(filtered.slice(0, currentNOE)); // Apply the current number of events limit
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} onCitySearch={handleCitySearch} />
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export default App;
