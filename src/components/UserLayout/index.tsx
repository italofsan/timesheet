import { ReactNode } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";
import { useAuth } from "../../hooks/useAuth";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Timesheet App
            </Typography>
            <Button color='inherit' onClick={handleSignOut}>
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid item xs={12}>
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </Grid>
    </div>
  );
};

export default UserLayout;
