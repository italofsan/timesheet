import { Grid, Paper, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import HistoryIcon from "@material-ui/icons/History";

import { useTimesheet } from "../../hooks/useTimesheet";

import { subtractHours } from "../../utils/functions/mathHoursFunctions";

import { useStyles } from "./styles";

export function Summary() {
  const classes = useStyles();
  const { totalWorkedHours, totalOvertimeHours, totalUndertimeHours } =
    useTimesheet();

  return (
    <>
      <Grid item xs={12} lg={4}>
        <Paper className={classes.workedHoursSummaryContainer}>
          <Typography className={classes.workedHoursSummaryValue}>
            {totalWorkedHours}
          </Typography>
          <Typography className={classes.workedHoursSummaryTitle}>
            Total Worked Hours
          </Typography>
          <HistoryIcon className={classes.arrowIcon} />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.summaryContainer}>
          <Typography className={classes.overtimeHoursSummaryValue}>
            {subtractHours(totalUndertimeHours, totalOvertimeHours).length === 6
              ? "00:00"
              : `${subtractHours(totalUndertimeHours, totalOvertimeHours)}`}
          </Typography>
          <Typography className={classes.summaryTitle}>
            Total Overtime Hours
          </Typography>
          <ArrowUpwardIcon className={classes.arrowIcon} />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={4}>
        <Paper className={classes.summaryContainer}>
          <Typography className={classes.undertimeHoursSummaryValue}>
            {subtractHours(totalOvertimeHours, totalUndertimeHours).length >= 6
              ? "00:00"
              : `${subtractHours(totalOvertimeHours, totalUndertimeHours)}`}
          </Typography>
          <Typography className={classes.summaryTitle}>
            Total Undertime Hours
          </Typography>
          <ArrowDownwardIcon className={classes.arrowIcon} />
        </Paper>
      </Grid>
    </>
  );
}
