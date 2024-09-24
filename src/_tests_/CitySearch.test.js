import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

jest.mock("../api"); // Mock the API

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    render(<CitySearch />); // Render the CitySearch component

    // Simulate typing in the city search input field
    const citySearchInput = screen.getByPlaceholderText("Search for a city");
    fireEvent.change(citySearchInput, { target: { value: "New" } });

    // Wait for the city suggestions to appear
    await waitFor(() => {
      const suggestions = screen.getAllByRole("listitem");
      expect(suggestions).toHaveLength(3); // Assert the correct number of suggestions
      expect(suggestions[0]).toHaveTextContent("New York");
      expect(suggestions[1]).toHaveTextContent("Los Angeles");
      expect(suggestions[2]).toHaveTextContent("San Francisco");
    });
  });
});
