// api.js

// Simulate fetching events
export const getEvents = () => {
  return new Promise((resolve) => {
    const events = [
      { id: 1, name: "Event 1", date: "2023-10-15" },
      { id: 2, name: "Event 2", date: "2023-10-16" },
      { id: 3, name: "Event 3", date: "2023-10-17" },
    ];
    setTimeout(() => resolve(events), 1000);
  });
};

// Simulate fetching city suggestions
export const getSuggestions = (query) => {
  return new Promise((resolve) => {
    const cities = ["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"];
    // Filter cities based on the query
    const filteredCities = cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));
    setTimeout(() => resolve(filteredCities), 500); // Simulate network latency
  });
};
