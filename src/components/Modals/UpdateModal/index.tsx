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

import { useTimesheet } from "../../../hooks/useTimesheet";

import { formatHourInput } from "../../../utils/functions/formatFunctions";
import { timesheetValidation } from "../../../utils/validations";
import { DataTimesheet } from "../../../utils/types";

import { useStyles } from "./styles";

interface UpdateModalProps {
  selectedTimesheet: DataTimesheet;
  updateModalOpen: boolean;
  handleCloseUpdateModal: () => void;
}

export function UpdateModal({
  selectedTimesheet,
  updateModalOpen,
  handleCloseUpdateModal,
}: UpdateModalProps) {
  const classes = useStyles();
  const { handleUpdateTimesheet } = useTimesheet();

  return (
    <Dialog open={updateModalOpen} onClose={handleCloseUpdateModal}>
      <DialogTitle>Update Register</DialogTitle>
      <Formik
        initialValues={selectedTimesheet}
        onSubmit={(values) => {
          handleUpdateTimesheet(values);
          handleCloseUpdateModal();
        }}
        validationSchema={timesheetValidation}
      >
        {({ values, errors, handleChange, isValid }) => (
          <FormikForm>
            <DialogContent className={classes.dialogContent}>
              <NumberFormat
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
                className={classes.inputModal}
                color='secondary'
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
                className={classes.inputModal}
                color='secondary'
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
                className={classes.inputModal}
                color='secondary'
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
              <Button onClick={handleCloseUpdateModal}>Cancel</Button>
              <Button
                type='submit'
                disabled={!isValid}
                className={classes.updateButton}
                role='submitButton'
              >
                Update
              </Button>
            </DialogActions>
          </FormikForm>
        )}
      </Formik>
    </Dialog>
  );
}
