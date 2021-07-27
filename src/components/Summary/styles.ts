import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workedHoursSummaryContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: colors.main,
      padding: "16px 16px",
      borderRadius: 20,
      position: "relative",
    },
    workedHoursSummaryTitle: {
      color: "#eee",
      fontSize: "1.4rem",
    },
    workedHoursSummaryValue: {
      color: "#eee",
      fontSize: "2rem",
    },
    summaryContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: "#fff",
      padding: "16px 16px",
      borderRadius: 20,
      position: "relative",
    },
    summaryTitle: {
      color: "#222",
      fontSize: "1.4rem",
    },

    summaryValue: {
      color: "#222",
      fontSize: "2rem",
    },
    overtimeHoursSummaryValue: {
      color: "#69f0ae",
      fontSize: "2rem",
    },
    undertimeHoursSummaryValue: {
      color: "#ff5252",
      fontSize: "2rem",
    },

    arrowIcon: {
      position: "absolute",
      color: "#ccc",
      bottom: 10,
      right: 10,
      opacity: 0.3,

      fontSize: 96,
      [theme.breakpoints.down("sm")]: {
        fontSize: 48,
      },
    },
  })
);
