import { useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";

import { TimesheetTable } from "../../components/TimesheetTable";
import { AddModal } from "../../components/Modals/AddModal";
import { Summary } from "../../components/Summary";

import { useStyles } from "./styles";

export function Home() {
  const classes = useStyles();

  const [addModalOpen, setAddModalOpen] = useState(false);
  function handleOpenAddModal() {
    setAddModalOpen(true);
  }
  function handleCloseAddModal() {
    setAddModalOpen(false);
  }

  return (
    <Container maxWidth='lg' style={{ marginTop: 24 }}>
      <Grid container className={classes.root} spacing={2}>
        <Grid container spacing={4}>
          <Summary />
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              size='small'
              variant='contained'
              className={classes.addButton}
              onClick={handleOpenAddModal}
            >
              + Add
            </Button>
          </Grid>
          <TimesheetTable />
        </Grid>

        <AddModal
          addModalOpen={addModalOpen}
          handleCloseAddModal={handleCloseAddModal}
        />
      </Grid>
    </Container>
  );
}
