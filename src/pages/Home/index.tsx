import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import timeHomePageImg from "../../assets/images/time-homepage.svg";

import { useAuth } from "../../hooks/useAuth";

import { useStyles } from "./styles";

export function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleLogin() {
    if (!user?.id) {
      await signInWithGoogle();
    }
    history.push("/app");
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Timesheet App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth='lg'>
          <Grid container justify='center' alignItems='center' direction='row'>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={classes.imageContainer}>
                <img
                  src={timeHomePageImg}
                  alt='Time Home Page'
                  className={classes.image}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className={classes.loginWrapper}
            >
              <Paper className={classes.loginContainer}>
                <Typography className={classes.loginTitle}>Log In</Typography>
                <Typography className={classes.loginSubtitle}>
                  To log in to the application you need to use a Google account
                </Typography>
                <Button
                  size='small'
                  variant='contained'
                  className={classes.loginButton}
                  onClick={handleLogin}
                  role='loginButton'
                >
                  Login With Google
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
