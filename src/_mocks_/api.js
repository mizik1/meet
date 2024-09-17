export const getEvents = jest.fn().mockResolvedValue([
  { id: 1, name: "Event 1", city: "New York" },
  { id: 2, name: "Event 2", city: "Los Angeles" },
  { id: 3, name: "Event 3", city: "San Francisco" },
]);
