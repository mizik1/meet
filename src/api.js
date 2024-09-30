import mockData from "./mock-data";
export const getEvents = () => {
  return mockData;
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
