import * as Yup from "yup";

export const timesheetValidation = Yup.object().shape({
  arrivalTime: Yup.string()
    .required("Arrival Time is required!")
    .matches(/\d{2}:\d{2}/, "The hour should have four numbers!"),

  lunchExitTime: Yup.string()
    .required("Lunch Exit Time is required!")
    .matches(/\d{2}:\d{2}/, "The hour should have four numbers!"),

  lunchArrivalTime: Yup.string()
    .required("Lunch Arrival Time is required!")
    .matches(/\d{2}:\d{2}/, "The hour should have four numbers!"),

  exitTime: Yup.string()
    .required("Exit Time is required!")
    .matches(/\d{2}:\d{2}/, "The hour should have four numbers!"),
});
