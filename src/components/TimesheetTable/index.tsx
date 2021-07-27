import { useState } from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { UpdateModal } from "../../components/Modals/UpdateModal";
import { useTimesheet } from "../../hooks/useTimesheet";

import { DataTimesheet } from "../../utils/types";

import { useStyles } from "./styles";
import { DeleteModal } from "../Modals/DeleteModal";
import { colors } from "../../styles/colors";

const columnsTimesheetTable = [
  "Options",
  "Date",
  "Arrival",
  "Lunch Exit",
  "Lunch Arrival",
  "Exit",
  "Worked Hours",
  "Overtime",
  "Undertime",
];

export function TimesheetTable() {
  const classes = useStyles();
  const { listTimesheets } = useTimesheet();

  const [selectedTimesheet, setSelectedTimesheet] = useState<DataTimesheet>(
    {} as DataTimesheet
  );

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  function handleOpenUpdateModal() {
    setUpdateModalOpen(true);
  }
  function handleCloseUpdateModal() {
    setUpdateModalOpen(false);
  }
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  function handleOpenDeleteModal() {
    setDeleteModalOpen(true);
  }
  function handleCloseDeleteModal() {
    setDeleteModalOpen(false);
  }

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table>
          <caption
            style={{ backgroundColor: colors.main, color: "#FFF" }}
          >{`You have ${
            listTimesheets && listTimesheets.length !== 0
              ? listTimesheets.length
              : 0
          }  register${
            listTimesheets && listTimesheets.length !== 1 ? "s" : ""
          }!`}</caption>
          <TableHead>
            <TableRow>
              {columnsTimesheetTable.map((columnTimesheetTable, index) => (
                <TableCell
                  key={index}
                  align='center'
                  className={classes.tableCellHeadOdd}
                >
                  {columnTimesheetTable}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listTimesheets.map((timesheet, index) => (
              <TableRow key={index}>
                <TableCell align='center'>
                  <Tooltip
                    arrow
                    title='Edit'
                    placement='top'
                    enterDelay={500}
                    TransitionComponent={Zoom}
                  >
                    <IconButton
                      edge='start'
                      className={classes.optionsButton}
                      color='inherit'
                      aria-label='edit'
                      onClick={() => {
                        setSelectedTimesheet(timesheet);
                        handleOpenUpdateModal();
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    arrow
                    title='Delete'
                    placement='top'
                    enterDelay={500}
                    TransitionComponent={Zoom}
                  >
                    <IconButton
                      edge='start'
                      className={classes.optionsButton}
                      color='inherit'
                      aria-label='delete'
                      onClick={() => {
                        setSelectedTimesheet(timesheet);
                        handleOpenDeleteModal();
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align='center' style={{ backgroundColor: "#eef" }}>
                  {timesheet.date &&
                    new Intl.DateTimeFormat("en-US").format(
                      new Date(timesheet.date)
                    )}
                </TableCell>
                <TableCell align='center'>{timesheet.arrivalTime}</TableCell>
                <TableCell align='center' style={{ backgroundColor: "#eef" }}>
                  {timesheet.lunchExitTime}
                </TableCell>
                <TableCell align='center'>
                  {timesheet.lunchArrivalTime}
                </TableCell>
                <TableCell align='center' style={{ backgroundColor: "#eef" }}>
                  {timesheet.exitTime}
                </TableCell>
                <TableCell align='center'>{timesheet.workedHours}</TableCell>
                <TableCell align='center' style={{ backgroundColor: "#eef" }}>
                  {timesheet.overtimeHours}
                </TableCell>
                <TableCell align='center'>{timesheet.undertimeHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateModal
        selectedTimesheet={selectedTimesheet}
        updateModalOpen={updateModalOpen}
        handleCloseUpdateModal={handleCloseUpdateModal}
      />
      <DeleteModal
        selectedTimesheet={selectedTimesheet}
        deleteModalOpen={deleteModalOpen}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </Grid>
  );
}
