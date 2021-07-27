import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
      background: "linear-gradient(0.25turn, rgb(143,125,238) , #FFF )",
    },
    appBar: {
      backgroundColor: colors.main,
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      display: "flex",
      width: "100%",
      height: "100%",
      padding: "24px 0",
    },
    image: {
      width: "100%",
      maxHeight: 620,
    },
    loginWrapper: {
      display: "flex",
      justifyContent: "center",
    },
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 48,
      maxWidth: 400,
    },
    loginTitle: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 32,
      color: colors.main,
      paddingBottom: theme.spacing(3),
    },
    loginSubtitle: {
      paddingBottom: theme.spacing(3),
    },
    loginButton: {
      fontSize: 14,
      fontWeight: "bold",
      padding: "4px 24px",
      color: colors.white,
      transition: ".5s ease",
      backgroundColor: colors.main,
      "&:hover": {
        backgroundColor: colors.mainHover,
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  })
);
