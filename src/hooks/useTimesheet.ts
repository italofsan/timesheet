import { useContext } from "react";
import { TimesheetContext } from "../contexts/TimesheetContext";

export function useTimesheet() {
  const value = useContext(TimesheetContext);

  return value;
}
