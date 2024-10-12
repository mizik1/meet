import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppComponent;

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is on the event list page", () => {
      AppComponent = render(<App />);
    });

    when("the event list is displayed", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("each event element should be collapsed by default", () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector(".details");
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test("User can expand an event to see details", ({ given, and, when, then }) => {
    given("the user is on the event list page", async () => {
      AppComponent = render(<App />);
    });

    and("an event element is collapsed", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector(".details");
      expect(eventDetails).not.toBeInTheDocument(); // Confirm it's collapsed
    });

    when("the user clicks on the event element", async () => {
      const user = userEvent.setup();
      const showDetailsButton = AppComponent.queryByText("Show Details");
      await user.click(showDetailsButton);
    });

    then("the event details should be displayed", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector(".details");
      expect(eventDetails).toBeInTheDocument(); // Confirm it's expanded
    });
  });

  test("User can collapse an event to hide details", ({ given, when, then }) => {
    given("the user is on the event list page and an event element is expanded", async () => {
      AppComponent = render(<App />);

      // Expand the event first
      const user = userEvent.setup();
      const showDetailsButton = AppComponent.queryByText("Show Details");
      await user.click(showDetailsButton);
      const eventDetails = AppComponent.container.querySelector(".details");
      expect(eventDetails).toBeInTheDocument(); // Confirm it's expanded
    });

    when("the user clicks on the event element again", async () => {
      const user = userEvent.setup();
      const hideDetailsButton = AppComponent.queryByText("Hide Details");
      await user.click(hideDetailsButton);
    });

    then("the event element should collapse to hide the event details", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventDetails = AppDOM.querySelector(".details");
      expect(eventDetails).not.toBeInTheDocument(); // Confirm it's collapsed
    });
  });
});
