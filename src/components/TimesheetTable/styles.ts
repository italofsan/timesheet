import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { colors } from "../../styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCellHead: {
      backgroundColor: colors.orange,
      color: colors.white,
    },
    tableCellHeadOdd: {
      backgroundColor: colors.main,
      color: colors.white,
    },
    optionsButton: {
      margin: "0 8px",
    },
  })
);
