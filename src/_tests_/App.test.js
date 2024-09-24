import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

jest.mock("../api"); // Mock the API

describe("<App /> component", () => {
  // Test 1: Renders a list of events
  test("renders list of events", () => {
    // Mock the events returned by the API
    getEvents.mockResolvedValueOnce([
      { name: "Event 1", location: "Berlin, Germany" },
      { name: "Event 2", location: "Munich, Germany" },
    ]);

    const { container } = render(<App />);
    expect(container.querySelector("#event-list")).toBeInTheDocument();
  });

  // Test 2: Filters the list of events based on city selection
  test("renders a list of events matching the city selected by the user", async () => {
    // Setup mock user event and API data
    const user = userEvent.setup();
    getEvents.mockResolvedValueOnce([
      { name: "Event 1", location: "Berlin, Germany" },
      { name: "Event 2", location: "Munich, Germany" },
      { name: "Event 3", location: "Berlin, Germany" },
    ]);

    // Render the App component
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Interact with the city search input field
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    // Simulate typing "Berlin" and selecting the suggested city
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    // Get the event list DOM and count the rendered event items
    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

    // Filter mock events to match the selected city
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter((event) => event.location === "Berlin, Germany");

    // Assert the number of rendered events matches the filtered list of Berlin events
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });
});
