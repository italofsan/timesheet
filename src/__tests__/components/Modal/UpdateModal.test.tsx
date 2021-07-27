import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";

import { UpdateModal } from "../../../components/Modals/UpdateModal";
import { DataTimesheet } from "../../../utils/types";
import { TimesheetContext } from "../../../contexts/TimesheetContext";

const selectedTimesheet = {
  arrivalTime: "07:00",
  lunchExitTime: "11:00",
  lunchArrivalTime: "12:00",
  exitTime: "16:00",
};

afterEach(cleanup);

const mockedValueProvider = {
  handleUpdateTimesheet: jest.fn(),
};

function renderUpdateModal(contextProps: any) {
  return render(
    <TimesheetContext.Provider value={contextProps}>
      <UpdateModal
        updateModalOpen={true}
        handleCloseUpdateModal={() => jest.fn()}
        selectedTimesheet={selectedTimesheet as DataTimesheet}
      />
    </TimesheetContext.Provider>
  );
}

describe("UpdateModal component", () => {
  it("should renders correctly", () => {
    render(
      <UpdateModal
        updateModalOpen={true}
        handleCloseUpdateModal={() => jest.fn()}
        selectedTimesheet={selectedTimesheet as DataTimesheet}
      />
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

  it("should be render with the hours of selected timesheet", async () => {
    render(
      <UpdateModal
        updateModalOpen={true}
        handleCloseUpdateModal={() => jest.fn()}
        selectedTimesheet={selectedTimesheet as DataTimesheet}
      />
    );

    const arrivalTimeInput = screen.getByTestId("arrivalTimeInput");
    const lunchExitTimeInput = screen.getByTestId("lunchExitTimeInput");
    const lunchArrivalTimeInput = screen.getByTestId("lunchArrivalTimeInput");
    const exitTimeInput = screen.getByTestId("exitTimeInput");

    await waitFor(() => {
      expect(arrivalTimeInput).toHaveValue("07:00");
    });
    await waitFor(() => {
      expect(lunchExitTimeInput).toHaveValue("11:00");
    });
    await waitFor(() => {
      expect(lunchArrivalTimeInput).toHaveValue("12:00");
    });
    await waitFor(() => {
      expect(exitTimeInput).toHaveValue("16:00");
    });
  });

  it("user should update a selected timesheet", async () => {
    render(
      <UpdateModal
        updateModalOpen={true}
        handleCloseUpdateModal={() => jest.fn()}
        selectedTimesheet={selectedTimesheet as DataTimesheet}
      />
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

  it("function to updated a selected timesheet should be called", async () => {
    renderUpdateModal(mockedValueProvider);

    const handleUpdateTimesheetMocked =
      mockedValueProvider.handleUpdateTimesheet;

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

    const updateButton = screen.getByRole("submitButton");

    await waitFor(() => {
      fireEvent.click(updateButton);
    });
    await waitFor(() => {
      expect(handleUpdateTimesheetMocked).toHaveBeenCalled();
    });
  });
});
