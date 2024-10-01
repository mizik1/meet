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
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities" ? allEvents : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
    setFilteredEvents(filteredEvents.slice(0, currentNOE)); // Also update filteredEvents here
  };

  const handleCitySearch = (city) => {
    setCurrentCity(city);
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
