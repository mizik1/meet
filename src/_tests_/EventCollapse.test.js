// EventCollapse.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event"; // Adjust the path as needed

describe("<Event /> component", () => {
  test("User can collapse an event to hide details", () => {
    const mockEvent = {
      id: 1,
      name: "Sample Event",
      details: "Event details",
    };

    render(<Event event={mockEvent} />);

    // Expand the event first
    const expandButton = screen.getByText("Show Details");
    fireEvent.click(expandButton);

    // Now collapse the event
    const collapseButton = screen.getByText("Hide Details");
    fireEvent.click(collapseButton);

    // Assert that the details are not visible
    const details = screen.queryByText(mockEvent.details);
    expect(details).not.toBeInTheDocument();
  });
});
