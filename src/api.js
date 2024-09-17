// api.js

export const getEvents = () => {
  // Simulating an API call to fetch events
  return new Promise((resolve) => {
    // Mock data for events
    const events = [
      { id: 1, name: "Event 1", date: "2023-10-15" },
      { id: 2, name: "Event 2", date: "2023-10-16" },
      { id: 3, name: "Event 3", date: "2023-10-17" },
    ];

    // Simulate network latency
    setTimeout(() => resolve(events), 1000);
  });
};
