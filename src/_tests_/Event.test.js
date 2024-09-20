import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";

const mockData = {
  name: "Sample Event",
  date: "2023-10-21",
  location: "Online",
  description: "An amazing event you don’t want to miss.",
  organizer: "Event Organizer",
};

describe("Event component", () => {
  test("renders event name, date, and location", () => {
    render(<Event event={mockData} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.date)).toBeInTheDocument();
    expect(screen.getByText(mockData.location)).toBeInTheDocument();
  });

  test("event details are collapsed by default", () => {
    render(<Event event={mockData} />);

    // Check that event details are not displayed initially
    const description = screen.queryByText(mockData.description);
    expect(description).not.toBeInTheDocument();
  });

  test("user can expand and collapse event details", () => {
    render(<Event event={mockData} />);

    // Check that an event to be displayed is initially collapsed
    const description = screen.queryByText(mockData.description);
    expect(description).not.toBeInTheDocument();

    // Check that a user can expand details
    fireEvent.click(screen.getByText("Show Details"));
    expect(screen.getByText(mockData.description)).toBeInTheDocument();

    // Test for user to collapse details
    fireEvent.click(screen.getByText("Hide Details"));
    expect(screen.queryByText(mockData.description)).not.toBeInTheDocument();
  });
});
