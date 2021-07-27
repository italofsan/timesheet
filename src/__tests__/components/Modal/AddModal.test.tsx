import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { AddModal } from "../../../components/Modals/AddModal";
import { TimesheetContext } from "../../../contexts/TimesheetContext";

afterEach(cleanup);

const mockedValueProvider = {
  handleAddTimesheet: jest.fn(),
};

function renderAddModal(contextProps: any) {
  return render(
    <TimesheetContext.Provider value={contextProps}>
      <AddModal addModalOpen={true} handleCloseAddModal={() => jest.fn()} />
    </TimesheetContext.Provider>
  );
}

describe("AddModal component", () => {
  it("renders correctly", () => {
    render(
      <AddModal addModalOpen={true} handleCloseAddModal={() => jest.fn()} />
    );

    const arrivalTimeInput = screen.getByTestId("arrivalTimeInput");
    const lunchExitTimeInput = screen.getByTestId("lunchExitTimeInput");
    const lunchArrivalTimeInput = screen.getByTestId("lunchArrivalTimeInput");
    const exitTimeInput = screen.getByTestId("exitTimeInput");
    const submitButton = screen.getByRole("submitButton");

    expect(arrivalTimeInput).toBeInTheDocument();
    expect(lunchExitTimeInput).toBeInTheDocument();
    expect(lunchArrivalTimeInput).toBeInTheDocument();
    expect(exitTimeInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("user can type the hours", async () => {
    render(
      <AddModal addModalOpen={true} handleCloseAddModal={() => jest.fn()} />
    );

    const arrivalTimeInput = screen.getByTestId("arrivalTimeInput");
    const lunchExitTimeInput = screen.getByTestId("lunchExitTimeInput");
    const lunchArrivalTimeInput = screen.getByTestId("lunchArrivalTimeInput");
    const exitTimeInput = screen.getByTestId("exitTimeInput");

    act(() => {
      fireEvent.change(arrivalTimeInput, { target: { value: "08:00" } });
      fireEvent.change(lunchExitTimeInput, { target: { value: "12:00" } });
      fireEvent.change(lunchArrivalTimeInput, { target: { value: "13:00" } });
      fireEvent.change(exitTimeInput, { target: { value: "17:00" } });
    });

    await waitFor(() => {
      expect(arrivalTimeInput).toHaveValue("08:00");
    });
    await waitFor(() => {
      expect(lunchExitTimeInput).toHaveValue("12:00");
    });
    await waitFor(() => {
      expect(lunchArrivalTimeInput).toHaveValue("13:00");
    });
    await waitFor(() => {
      expect(exitTimeInput).toHaveValue("17:00");
    });
  });

  it("function to create a new timesheet should be called", async () => {
    renderAddModal(mockedValueProvider);

    const handleAddTimesheetMocked = mockedValueProvider.handleAddTimesheet;

    const arrivalTimeInput = screen.getByTestId("arrivalTimeInput");
    const lunchExitTimeInput = screen.getByTestId("lunchExitTimeInput");
    const lunchArrivalTimeInput = screen.getByTestId("lunchArrivalTimeInput");
    const exitTimeInput = screen.getByTestId("exitTimeInput");

    act(() => {
      fireEvent.change(arrivalTimeInput, { target: { value: "08:00" } });
      fireEvent.change(lunchExitTimeInput, { target: { value: "12:00" } });
      fireEvent.change(lunchArrivalTimeInput, { target: { value: "13:00" } });
      fireEvent.change(exitTimeInput, { target: { value: "17:00" } });
    });

    const addButton = screen.getByRole("submitButton");

    await waitFor(() => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(handleAddTimesheetMocked).toHaveBeenCalled();
    });
  });
});
