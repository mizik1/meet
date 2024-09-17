import { render } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api"; // Import the mock

jest.mock("../api"); // Mock the API

describe("<App /> component", () => {
  test("renders list of events", () => {
    getEvents.mockResolvedValueOnce([{ name: "Event 1" }, { name: "Event 2" }]); // Mock data

    const { container } = render(<App />);
    expect(container.querySelector("#event-list")).toBeInTheDocument();
  });
});
