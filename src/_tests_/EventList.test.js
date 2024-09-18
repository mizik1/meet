import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api"; // Ensure to mock getEvents

jest.mock("../api"); // Mock the API

describe("<EventList /> component", () => {
  beforeEach(() => {
    // Mock the events API response
    getEvents.mockResolvedValue([
      { id: 1, name: "Event 1", date: "2023-10-15" },
      { id: 2, name: "Event 2", date: "2023-10-16" },
    ]);
  });

  test("renders upcoming events from all cities when no city is searched", async () => {
    render(<EventList />); // Render the EventList component

    // Wait for the events to appear in the document
    const events = await screen.findAllByRole("listitem");
    expect(events).toHaveLength(2); // Assert the correct number of events
  });
});
