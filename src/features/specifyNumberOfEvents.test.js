import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  // Scenario 1: When user hasn’t specified a number, 32 events are shown by default
  test("When user hasn’t specified a number, 32 events are shown by default", ({ given, when, then }) => {
    let AppComponent;

    given("the user has not specified a number of events to display", () => {
      AppComponent = render(<App />);
    });

    when("the user views the event list", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("32 events should be shown by default", () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });

  // Scenario 2: User can change the number of events displayed
  test("User can change the number of events displayed", ({ given, when, then }) => {
    let AppComponent;

    given("the user wants to change the number of events displayed", () => {
      AppComponent = render(<App />);
    });

    when("the user specifies a different number of events", () => {
      const NumberOfEventsInput = AppComponent.container.querySelector(".number-of-events-input");
      fireEvent.change(NumberOfEventsInput, { target: { value: "10" } });
    });

    then("the specified number of events should be displayed", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(10);
      });
    });
  });
});
