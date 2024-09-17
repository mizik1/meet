import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // Import act from react
import EventList from "../components/EventList";
import { getEvents } from "../api"; // Make sure to import the API correctly

jest.mock("../api"); // Mock the API

describe("<EventList /> component", () => {
  beforeEach(() => {
    getEvents.mockResolvedValue([
      { id: 1, name: "Test Event 1", date: "2023-10-20" },
      { id: 2, name: "Test Event 2", date: "2023-10-21" },
    ]);
  });

  test("renders upcoming events from all cities when no city is searched", async () => {
    await act(async () => {
      render(<EventList />); // Render the component within act()
    });

    // Wait for the mocked events to appear in the document
    const events = await screen.findAllByRole("listitem");

    // Assert the correct number of events are displayed
    expect(events).toHaveLength(2);
  });
});
