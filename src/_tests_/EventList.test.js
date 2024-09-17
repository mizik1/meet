import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../_mocks_/api";

// Mock getEvents API function
jest.mock("../api");

describe("<EventList /> component", () => {
  beforeEach(() => {
    // Mock the API response with some sample events
    getEvents.mockResolvedValue([
      { id: 1, name: "Event 1", city: "New York" },
      { id: 2, name: "Event 2", city: "Los Angeles" },
      { id: 3, name: "Event 3", city: "San Francisco" },
    ]);
  });

  test("renders upcoming events from all cities when no city is searched", async () => {
    // Render the EventList component
    render(<EventList />);

    // Wait for the mocked events to appear in the document
    const events = await screen.findAllByRole("listitem");

    // Assert that all the events are rendered
    expect(events).toHaveLength(3);

    // Optional: Check if the event names are displayed correctly
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
    expect(screen.getByText("Event 3")).toBeInTheDocument();
  });
});
