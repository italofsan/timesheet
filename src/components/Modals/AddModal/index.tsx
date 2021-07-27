import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik, Form as FormikForm } from "formik";
import NumberFormat from "react-number-format";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useTimesheet } from "../../../hooks/useTimesheet";

import { formatHourInput } from "../../../utils/functions/formatFunctions";
import { timesheetValidation } from "../../../utils/validations";
import { DataTimesheetInput } from "../../../utils/types";

import { useStyles } from "./styles";

interface AddModalProps {
  addModalOpen: boolean;
  handleCloseAddModal: () => void;
}

export function AddModal({ addModalOpen, handleCloseAddModal }: AddModalProps) {
  const classes = useStyles();
  const { handleAddTimesheet } = useTimesheet();

  const formData: DataTimesheetInput = {
    date: new Date(),
    arrivalTime: "",
    lunchExitTime: "",
    lunchArrivalTime: "",
    exitTime: "",
  };

  return (
    <Dialog open={addModalOpen} onClose={handleCloseAddModal}>
      <DialogTitle>Add Register</DialogTitle>
      <Formik
        initialValues={formData}
        onSubmit={(values) => {
          handleAddTimesheet(values);
          handleCloseAddModal();
        }}
        validationSchema={timesheetValidation}
      >
        {({ values, errors, handleChange, isValid, setFieldValue }) => (
          <FormikForm>
            <DialogContent className={classes.dialogContent}>
              <Calendar
                onChange={(value) => setFieldValue("date", value)}
                value={values.date}
                locale='en-US'
                className={classes.calendar}
              />

              <NumberFormat
                name='arrivalTime'
                className={classes.inputModal}
                color='secondary'
                placeholder='00:00'
                label='Arrival Time'
                variant='outlined'
                inputProps={{ "data-testid": "arrivalTimeInput" }}
                customInput={TextField}
                value={values.arrivalTime}
                format='##:##'
                onValueChange={(values) => {
                  const { formattedValue } = values;
                  formatHourInput(formattedValue, handleChange("arrivalTime"));
                }}
              />
              {errors.arrivalTime && (
                <Typography className={classes.errorModal}>
                  {errors.arrivalTime}
                </Typography>
              )}
              <NumberFormat
                name='lunchExitTime'
                color='secondary'
                className={classes.inputModal}
                placeholder='00:00'
                label='Lunch Exit Time'
                variant='outlined'
                inputProps={{ "data-testid": "lunchExitTimeInput" }}
                customInput={TextField}
                value={values.lunchExitTime}
                format='##:##'
                onValueChange={(values) => {
                  const { formattedValue } = values;
                  formatHourInput(
                    formattedValue,
                    handleChange("lunchExitTime")
                  );
                }}
              />
              {errors.lunchExitTime && (
                <Typography className={classes.errorModal}>
                  {errors.lunchExitTime}
                </Typography>
              )}
              <NumberFormat
                name='lunchArrivalTime'
                color='secondary'
                className={classes.inputModal}
                placeholder='00:00'
                label='Lunch Arrival Time'
                variant='outlined'
                inputProps={{ "data-testid": "lunchArrivalTimeInput" }}
                customInput={TextField}
                value={values.lunchArrivalTime}
                format='##:##'
                onValueChange={(values) => {
                  const { formattedValue } = values;
                  formatHourInput(
                    formattedValue,
                    handleChange("lunchArrivalTime")
                  );
                }}
              />
              {errors.lunchArrivalTime && (
                <Typography className={classes.errorModal}>
                  {errors.lunchArrivalTime}
                </Typography>
              )}
              <NumberFormat
                name='exitTime'
                color='secondary'
                className={classes.inputModal}
                placeholder='00:00'
                label='Exit Time'
                variant='outlined'
                inputProps={{ "data-testid": "exitTimeInput" }}
                customInput={TextField}
                value={values.exitTime}
                format='##:##'
                onValueChange={(values) => {
                  const { formattedValue } = values;
                  formatHourInput(formattedValue, handleChange("exitTime"));
                }}
              />
              {errors.exitTime && (
                <Typography className={classes.errorModal}>
                  {errors.exitTime}
                </Typography>
              )}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button onClick={handleCloseAddModal}>Cancel</Button>
              <Button
                type='submit'
                disabled={!isValid}
                className={classes.addButton}
                role='submitButton'
              >
                Add
              </Button>
            </DialogActions>
          </FormikForm>
        )}
      </Formik>
    </Dialog>
  );
}
