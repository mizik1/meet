import { render } from "@testing-library/react";
import { getEvents } from "../api";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} />);
  });

  test("default value of field is 32", () => {
    expect(NumberOfEventsComponent.queryByRole("textbox")).toHaveValue("32");
  });

  test("update value as user types", async () => {
    const numberOfEvents = NumberOfEventsComponent.queryByRole("textbox");
    await userEvent.type(numberOfEvents, "{backspace}{backspace}10");
    expect(numberOfEvents).toHaveValue("10");
  });
});
