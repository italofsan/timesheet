import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "../../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      padding: "8px 24px",
      "&:first-child": {
        paddingTop: theme.spacing(1),
      },
    },
    dialogActions: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(2),
    },
    deleteButton: {
      fontSize: 14,
      fontWeight: "bold",
      padding: "5px 25px",
      color: colors.white,
      transition: ".5s ease",
      backgroundColor: colors.decline,
      "&:hover": {
        backgroundColor: colors.declineHover,
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  })
);
