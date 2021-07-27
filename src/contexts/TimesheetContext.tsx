import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { errorMessage, successMessage } from "../components/Messages";
import { DataTimesheetInput, DataTimesheet } from "../utils/types";
import {
  calcUndertimeHours,
  calcOvertimeHours,
  calcWorkedHours,
  sumHours,
} from "../utils/functions/mathHoursFunctions";
import { isTimesheetExists } from "../utils/functions/timesheetFunctions";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

interface TimesheetContextProps {
  listTimesheets: DataTimesheet[];
  totalWorkedHours: string;
  totalOvertimeHours: string;
  totalUndertimeHours: string;
  handleAddTimesheet: (valuesForm: DataTimesheetInput) => void;
  handleUpdateTimesheet: (valuesForm: DataTimesheet) => void;
  handleDeleteTimesheet: (selectedTimesheetId: string) => void;
}

interface TimesheetContextProviderProps {
  children: ReactNode;
}

type FirebaseTimesheets = Record<string, DataTimesheet>;

export const TimesheetContext = createContext<TimesheetContextProps>(
  {} as TimesheetContextProps
);

export function TimesheetContextProvider({
  children,
}: TimesheetContextProviderProps) {
  const { user } = useAuth();
  const [listTimesheets, setListTimesheets] = useState<DataTimesheet[]>([]);
  const [totalWorkedHours, setTotalWorkedHours] = useState("00:00");
  const [totalOvertimeHours, setTotalOvertimeHours] = useState("00:00");
  const [totalUndertimeHours, setTotalUndertimeHours] = useState("00:00");

  useEffect(() => {
    setTotalWorkedHours(
      listTimesheets.reduce((sumTotal, log) => {
        return sumHours(sumTotal, log.workedHours);
      }, "00:00")
    );

    setTotalOvertimeHours(
      listTimesheets.reduce((sumTotal, log) => {
        return sumHours(sumTotal, log.overtimeHours);
      }, "00:00")
    );

    setTotalUndertimeHours(
      listTimesheets.reduce((sumTotal, log) => {
        return sumHours(sumTotal, log.undertimeHours);
      }, "00:00")
    );
  }, [listTimesheets]);

  useEffect(() => {
    const timesheetRef = database.ref();
    timesheetRef.on("value", (timesheet) => {
      const databaseTimesheet = timesheet.val();
      const firebaseTimesheets: FirebaseTimesheets = databaseTimesheet
        ? databaseTimesheet.timesheets
        : {};

      if (firebaseTimesheets) {
        const parsedTimesheets = Object.entries(firebaseTimesheets)
          .map(([key, value]) => {
            return {
              id: key,
              date: value.date,
              idUser: value.idUser,
              arrivalTime: value.arrivalTime,
              lunchExitTime: value.lunchExitTime,
              lunchArrivalTime: value.lunchArrivalTime,
              exitTime: value.exitTime,
              undertimeHours: value.undertimeHours,
              overtimeHours: value.overtimeHours,
              workedHours: value.workedHours,
              createdAt: value.createdAt,
            };
          })
          .filter((timesheet) => timesheet.idUser === user.id);

        setListTimesheets(parsedTimesheets);
      }
    });

    return () => {
      timesheetRef.off("value");
    };
  }, [user.id]);

  const handleAddTimesheet = useCallback(
    async (valuesForm: DataTimesheetInput) => {
      if (isTimesheetExists(listTimesheets, valuesForm)) {
        return errorMessage("You already have a register for this day!");
      }
      const timesheetRef = database.ref("timesheets");
      try {
        await timesheetRef.push({
          ...valuesForm,
          overtimeHours: calcOvertimeHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
          undertimeHours: calcUndertimeHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
          workedHours: calcWorkedHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
          createdAt: String(new Date()),
          date: String(new Date(valuesForm.date)),
          idUser: user.id,
        });
        successMessage("Register created gracefully!");
      } catch (error) {
        errorMessage("Unable to create register!");
      }
    },
    [user.id, listTimesheets]
  );

  const handleUpdateTimesheet = useCallback(
    async (valuesForm: DataTimesheet) => {
      try {
        await database.ref(`timesheets/${valuesForm.id}`).update({
          arrivalTime: valuesForm.arrivalTime,
          lunchExitTime: valuesForm.lunchExitTime,
          lunchArrivalTime: valuesForm.lunchArrivalTime,
          exitTime: valuesForm.exitTime,
          overtimeHours: calcOvertimeHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
          undertimeHours: calcUndertimeHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
          workedHours: calcWorkedHours(
            valuesForm.arrivalTime,
            valuesForm.lunchExitTime,
            valuesForm.lunchArrivalTime,
            valuesForm.exitTime
          ),
        });
        successMessage("Register updated gracefully!");
      } catch (error) {
        errorMessage("Unable to update register!");
      }
    },
    []
  );

  const handleDeleteTimesheet = useCallback(
    async (selectedTimesheetId: string) => {
      try {
        await database.ref(`timesheets/${selectedTimesheetId}`).remove();
        successMessage("Register removed gracefully!");
      } catch (error) {
        errorMessage("Unable to remove register!");
      }
    },
    []
  );

  return (
    <TimesheetContext.Provider
      value={{
        listTimesheets,
        totalWorkedHours,
        totalOvertimeHours,
        totalUndertimeHours,
        handleAddTimesheet,
        handleUpdateTimesheet,
        handleDeleteTimesheet,
      }}
    >
      {children}
    </TimesheetContext.Provider>
  );
}
