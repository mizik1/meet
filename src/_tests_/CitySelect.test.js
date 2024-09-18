import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import CitySelect from "../components/CitySelect"; // Import the component to be tested
import { getSuggestions } from "../api"; // Import the mock API

jest.mock("../api"); // Mock the API

describe("<CitySelect /> component", () => {
  beforeEach(() => {
    // Mock the city suggestions API response
    getSuggestions.mockImplementation(
      (query) =>
        new Promise((resolve) => setTimeout(() => resolve(["New York", "Los Angeles", "San Francisco", "Chicago", "Miami"]), 500))
    );
  });

  test("User can select a city from the suggested list", async () => {
    render(<CitySelect />);

    // Simulate typing in the city search input field
    const citySearchInput = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(citySearchInput, { target: { value: "New" } });

    // Wait for the city suggestions to appear
    const suggestions = await screen.findAllByRole("listitem");

    // Simulate selecting a city from the suggestions
    fireEvent.click(suggestions[0]);

    // Verify the selected city is displayed in the input field
    expect(citySearchInput.value).toBe("New York");
  });
});
