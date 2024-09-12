import { render } from "@testing-library/react";
import EventList from "./EventList";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
});

const EventList = () => {
  return <ul id="event-list"></ul>;
};

export default EventList;
