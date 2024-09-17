import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { act } from "react";
import EventList from "../components/EventList";
import { getEvents, getSuggestions } from "../api"; // Import both API functions

jest.mock("../api"); // Mock the API calls

describe("<EventList /> component", () => {
  beforeEach(() => {
    // Mock the events API response for Scenario 1
    getEvents.mockResolvedValue([
      { id: 1, name: "Test Event 1", date: "2023-10-20" },
      { id: 2, name: "Test Event 2", date: "2023-10-21" },
    ]);
  });

  // Scenario 2: User should see a list of suggestions when they search for a city
  test("User should see a list of suggestions when they search for a city", async () => {
    // Mock the city suggestions API response
    getSuggestions.mockResolvedValue(["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"]);

    // Wrap in act to handle async state updates
    await act(async () => {
      // Render the component
      render(<EventList />);

      // Simulate typing in the city search input field
      const citySearchInput = screen.getByPlaceholderText("Search for a city");
      fireEvent.change(citySearchInput, { target: { value: "New" } });

      // Wait for the city suggestions to appear in the document
      const suggestions = await screen.findAllByRole("listitem");

      // Assert the correct number of city suggestions are displayed
      expect(suggestions).toHaveLength(5);

      // Assert that the suggestions are correct
      expect(suggestions[0]).toHaveTextContent("New York");
      expect(suggestions[1]).toHaveTextContent("Los Angeles");
      expect(suggestions[2]).toHaveTextContent("San Francisco");
      expect(suggestions[3]).toHaveTextContent("Chicago");
      expect(suggestions[4]).toHaveTextContent("Miami");
    });
  });
});
