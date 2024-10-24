import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert"; // Import WarningAlert
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events
  const [allLocations, setAllLocations] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState(""); // New warningAlert state

  // Check the online status on component mount
  useEffect(() => {
    if (!navigator.onLine) {
      setWarningAlert("You are currently offline. The data may not be up to date.");
    } else {
      setWarningAlert(""); // Clear the warning if the user is online
    }

    // Listen for online/offline changes
    const handleOnline = () => setWarningAlert("");
    const handleOffline = () => setWarningAlert("You are offline. The data may not be up to date.");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty dependency array to run this once on mount

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities" ? allEvents : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
    setFilteredEvents(filteredEvents.slice(0, currentNOE)); // Also update filteredEvents here
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />} {/* Display ErrorAlert */}
        {warningAlert && <WarningAlert text={warningAlert} />} {/* Display WarningAlert */}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        setErrorAlert={setErrorAlert}
      />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export default App;
