// EventExpand.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event"; // Adjust the path as needed

describe("<Event /> component", () => {
  test("User can expand an event to see details", () => {
    const mockEvent = {
      id: 1,
      name: "Sample Event",
      details: "Event details",
    };

    render(<Event event={mockEvent} />);

    // Click the expand button to show details
    const expandButton = screen.getByText("Show Details");
    fireEvent.click(expandButton);

    // Assert that the details are now visible
    const details = screen.getByText(mockEvent.details);
    expect(details).toBeInTheDocument();
  });
});
