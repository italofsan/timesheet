import { DataTimesheet, DataTimesheetInput } from "../types";

export function isTimesheetExists(
  list: DataTimesheet[],
  valuesForm: DataTimesheetInput
) {
  let listCopy = [...list];
  let alreadyExists = listCopy.some((timesheet) => {
    return (
      new Date(timesheet.date).getDate() ===
        new Date(valuesForm.date).getDate() &&
      new Date(timesheet.date).getMonth() ===
        new Date(valuesForm.date).getMonth() &&
      new Date(timesheet.date).getFullYear() ===
        new Date(valuesForm.date).getFullYear()
    );
  });
  if (alreadyExists) {
    return true;
  } else {
    return false;
  }
}
