// Mock getEvents function
export const getEvents = jest.fn(() => Promise.resolve([{ name: "Event 1" }, { name: "Event 2" }, { name: "Event 3" }]));

// Mock getSuggestions function
export const getSuggestions = jest.fn((query) => {
  const cities = ["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"];
  const filteredCities = cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()));
  return Promise.resolve(filteredCities);
});
