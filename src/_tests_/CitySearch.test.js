import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    // Wait for the city suggestions to appear

    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    const citySearchInput = CitySearchComponent.getByPlaceholderText("Search for a city");

    await userEvent.type(citySearchInput, "New");
    const suggestions = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestions[0]).toHaveTextContent("New York");
  });
});
