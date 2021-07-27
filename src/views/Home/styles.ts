import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    addButton: {
      fontSize: 14,
      fontWeight: "bold",
      padding: "5px 25px",
      color: colors.white,
      transition: ".5s ease",
      backgroundColor: colors.main,
      "&:hover": {
        backgroundColor: colors.mainHover,
      },
      borderRadius: 5,
      textDecoration: "none",
      [theme.breakpoints.down("xs")]: {
        minWidth: "100%",
      },
    },
    buttonContainer: {
      [theme.breakpoints.down("xs")]: {
        position: "relative",
      },
    },
  })
);
