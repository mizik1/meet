import { loadFeature, defineFeature } from "jest-cucumber";
import { render, fireEvent, within, waitFor } from "@testing-library/react";
import App from "../App";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  // Scenario: When user hasn’t searched for a city, show upcoming events from all cities
  test("When user hasn’t searched for a city, show upcoming events from all cities", ({ given, when, then }) => {
    let AppComponent;

    given("the user has not searched for a city", () => {
      AppComponent = render(<App />);
    });

    when("the user views the event list", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then("the user should see upcoming events from all cities", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      EventListItems.forEach((eventItem) => {
        const eventLocation = within(eventItem).getByText(/Location:/i);
        expect(eventLocation).toBeInTheDocument();
      });
    });
  });

  // Scenario: User should see a list of suggestions when they search for a city
  test("User should see a list of suggestions when they search for a city", ({ given, when, then }) => {
    let AppComponent;

    given("the user is searching for a city", () => {
      AppComponent = render(<App />);
    });

    when("the user types in the search bar", () => {
      const AppDOM = AppComponent.container.firstChild;
      const citySearchInput = AppDOM.querySelector(".city");
      fireEvent.change(citySearchInput, { target: { value: "Berlin" } });
    });

    then("the user should see a list of city suggestions matching the input", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const suggestionList = AppDOM.querySelector(".suggestions");
      await waitFor(() => {
        const suggestionItems = within(suggestionList).queryAllByRole("listitem");
        expect(suggestionItems.length).toBeGreaterThan(0);
      });
    });
  });

  // Scenario: User can select a city from the suggested list
  test("User can select a city from the suggested list", ({ given, when, then, and }) => {
    let AppComponent;

    given("the user is viewing the list of city suggestions", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const citySearchInput = AppDOM.querySelector(".city");
      fireEvent.change(citySearchInput, { target: { value: "Berlin" } });

      const suggestionList = AppDOM.querySelector(".suggestions");
      await waitFor(() => {
        const suggestionItems = within(suggestionList).queryAllByRole("listitem");
        expect(suggestionItems.length).toBeGreaterThan(0);
      });
    });

    when("the user selects a city from the suggested list", () => {
      const AppDOM = AppComponent.container.firstChild;
      const suggestionList = AppDOM.querySelector(".suggestions");
      const berlinSuggestion = within(suggestionList).getByText("Berlin");
      fireEvent.click(berlinSuggestion);
    });

    then("the selected city should be set as the search criteria", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const citySearchInput = AppDOM.querySelector(".city");
      expect(citySearchInput.value).toBe("Berlin");
    });

    and("the user should see events for the selected city", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      EventListItems.forEach((eventItem) => {
        const eventLocation = within(eventItem).getByText(/Berlin/i);
        expect(eventLocation).toBeInTheDocument();
      });
    });
  });
});
