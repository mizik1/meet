import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let EventComponent;
  let event = mockData[0];
  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });
  test("renders event title", () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });
  test("renders event created time", () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });
  test("renders event location", () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });
  test("event details hidden by default", () => {
    const details = EventComponent.container.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  });
  test("renders show details button", () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });
  test('shows details when user clicks on ("Show Details") button', async () => {
    const showDetailsButton = EventComponent.queryByText("Show Details");
    await userEvent.click(showDetailsButton);
    const details = EventComponent.container.querySelector(".details");
    expect(details).toBeInTheDocument();
  });
  test('hides details when user clicks on ("Hide Details") button', async () => {
    const showDetailsButton = EventComponent.queryByText("Show Details");
    await userEvent.click(showDetailsButton);
    const hideDetailsButton = EventComponent.queryByText("Hide Details");
    await userEvent.click(hideDetailsButton);
    const details = EventComponent.container.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  });
});
