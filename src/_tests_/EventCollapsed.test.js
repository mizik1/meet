// EventCollapsed.test.js

import { render, screen } from "@testing-library/react";
import Event from "../components/Event"; // Adjust the path as needed

describe("<Event /> component", () => {
  test("An event element is collapsed by default", () => {
    const mockEvent = {
      id: 1,
      name: "Sample Event",
      details: "Event details",
    };

    render(<Event event={mockEvent} />);

    // Assert that the details are not visible by default
    const details = screen.queryByText(mockEvent.details);
    expect(details).not.toBeInTheDocument();
  });
});
