import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents"; 

describe("<NumberOfEvents /> component", () => {
  test("renders the input for number of events", () => {
    const mockOnNumberChange = jest.fn();

    // Render the component with default props
    render(<NumberOfEvents currentNOE={32} onNumberChange={mockOnNumberChange} />);

    // Check if the input field is in the document
    const inputElement = screen.getByLabelText("Number of Events:");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("32"); \
  });

  test("updates the number of events when user changes input", () => {
    const mockOnNumberChange = jest.fn();

    // Render the component with default props
    render(<NumberOfEvents currentNOE={32} onNumberChange={mockOnNumberChange} />);

    // Get the input field and simulate changing the value
    const inputElement = screen.getByLabelText("Number of Events:");
    fireEvent.change(inputElement, { target: { value: "10" } });

    // Expect the value to have changed in the input field
    expect(inputElement.value).toBe("10");

    // Verify the callback is called with the new number of events
    expect(mockOnNumberChange).toHaveBeenCalledWith(10);
  });

  test("ensures the minimum number of events is 1", () => {
    const mockOnNumberChange = jest.fn();

    // Render the component
    render(<NumberOfEvents currentNOE={32} onNumberChange={mockOnNumberChange} />);

    // Simulate changing the input to 0
    const inputElement = screen.getByLabelText("Number of Events:");
    fireEvent.change(inputElement, { target: { value: "0" } });

    // Expect the value in the input to default to at least 1
    expect(inputElement.value).toBe("1");
  });
});
