import { render, screen, fireEvent } from "@testing-library/react";
import DatePickerComponent from "../../components/common/DatePicker";

describe("DatePickerComponent", () => {
  const handleDateChange = jest.fn();
  it("renders start date and end date fields correctly", () => {
    render(
      <DatePickerComponent
        startDate="2025-02-01"
        endDate="2025-02-10"
        handleDateChange={handleDateChange}
      />
    );

    expect(
      screen.getByPlaceholderText(/select a start date/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/select an end date/i)
    ).toBeInTheDocument();
  });

  it("displays the correct date format in the input fields", () => {
    render(
      <DatePickerComponent
        startDate="2025-02-01"
        endDate="2025-02-10"
        handleDateChange={handleDateChange}
      />
    );

    expect(screen.getByPlaceholderText("Select a start date")).toHaveValue(
      "2025-02-01"
    );
    expect(screen.getByPlaceholderText("Select an end date")).toHaveValue(
      "2025-02-10"
    );
  });

  it("calls handleDateChange when a new date is selected", () => {
    render(
      <DatePickerComponent
        startDate="2025-02-01"
        endDate="2025-02-10"
        handleDateChange={handleDateChange}
      />
    );

    const startDateInput = screen.getByPlaceholderText("Select a start date");
    fireEvent.change(startDateInput, { target: { value: "2025-03-01" } });

    expect(handleDateChange).toHaveBeenCalledWith(
      new Date("2025-03-01"),
      "startDate"
    );

    const endDateInput = screen.getByPlaceholderText("Select an end date");
    fireEvent.change(endDateInput, { target: { value: "2025-03-15" } });

    expect(handleDateChange).toHaveBeenCalledWith(
      new Date("2025-03-15"),
      "endDate"
    );
  });

  it("does not call handleDateChange when an invalid date is entered", () => {
    render(
      <DatePickerComponent
        startDate="2025-02-01"
        endDate="2025-02-10"
        handleDateChange={handleDateChange}
      />
    );

    const startDateInput = screen.getByPlaceholderText("Select a start date");
    fireEvent.change(startDateInput, { target: { value: "invalid-date" } });

    expect(handleDateChange).not.toHaveBeenCalled();
  });
});
