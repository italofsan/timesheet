import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";

import { useTimesheet } from "../../../hooks/useTimesheet";
import { DataTimesheet } from "../../../utils/types";

import { useStyles } from "./styles";

interface DeleteModalProps {
  selectedTimesheet: DataTimesheet;
  deleteModalOpen: boolean;
  handleCloseDeleteModal: () => void;
}

export function DeleteModal({
  selectedTimesheet,
  deleteModalOpen,
  handleCloseDeleteModal,
}: DeleteModalProps) {
  const classes = useStyles();
  const { handleDeleteTimesheet } = useTimesheet();

  return (
    <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
      <DialogTitle>Delete Register</DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Typography>Do you really want to delete this register?</Typography>
        <Typography>{`Date: ${
          selectedTimesheet.date &&
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(selectedTimesheet.date))
        }`}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
        <Button
          className={classes.deleteButton}
          onClick={() => {
            handleDeleteTimesheet(selectedTimesheet.id);
            handleCloseDeleteModal();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
