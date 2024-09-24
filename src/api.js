// Simulate fetching events
export const getEvents = () => {
  return new Promise((resolve) => {
    const events = [
      { id: 1, name: "Event 1", date: "2023-10-15", location: "New York" },
      { id: 2, name: "Event 2", date: "2023-10-16", location: "Los Angeles" },
      { id: 3, name: "Event 3", date: "2023-10-17", location: "New York" },
    ];
    setTimeout(() => resolve(events), 1000);
  });
};

// Simulate fetching city suggestions
export const getSuggestions = (query) => {
  return new Promise((resolve) => {
    const cities = ["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"];
    const filteredCities = cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));
    setTimeout(() => resolve(filteredCities), 500); // Simulate network latency
  });
};

// Extract unique locations from events
export const extractLocations = (events) => {
  const locations = events.map((event) => event.location);
  return [...new Set(locations)]; // Return unique locations
};
