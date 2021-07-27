import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { colors } from "../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "rgb(229, 236, 233)",
      minHeight: "100vh",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: colors.main,
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      height: "100%",
      padding: theme.spacing(3),
    },
  })
);
