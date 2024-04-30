import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { RegistrarNuevoProyecto } from "./RegistrarNuevoProyecto";
import { CardProyecto } from "./CardProyecto";

export function DesignerCohesionIndex() {
  const [reload, setReload] = useState("");
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                width: "100%",
                height: "700px",
              }}
            >
              <RegistrarNuevoProyecto setReload={setReload} />
              <CardProyecto reload={reload} setReload={setReload} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
