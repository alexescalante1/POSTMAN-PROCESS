import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { DtDesingMicroServicesCls } from "../../../../Data";
import { Alertas } from "../../../GenComponents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function RegistrarNuevoProyecto({ setReload }) {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripProyecto, setDescripProyecto] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const registrarProject = async (e) => {
    e.preventDefault();
    try {
      let data = await new DtDesingMicroServicesCls().SetNewProject({
        nombre: nombreProyecto,
        descrip: descripProyecto,
        fecha: new Date(),
      });
      if (data) {
        Alertas("success", "Nuevo Proyecto Creado.");
        setReload(data);
        setOpen(false);
        setNombreProyecto("");
        setDescripProyecto("");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
          NUEVO PROYECTO
        </Button>
      </Stack>
      <br />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <Typography flex={2} variant="h5" style={{ fontWeight: "bold" }}>
                {"CREAR NUEVO PROYECTO"}
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={registrarProject}>
            <TextField
              id="nameProjec"
              margin="normal"
              fullWidth
              label="Nombre del proyecto"
              className="mb-4"
              onChange={(e) => setNombreProyecto(e.target.value)}
              value={nombreProyecto}
            />
            <TextField
              id="descProjec"
              margin="normal"
              fullWidth
              label="Descripción del proyecto"
              className="mb-4"
              onChange={(e) => setDescripProyecto(e.target.value)}
              value={descripProyecto}
              multiline
              rows={6}
            />
            <Button
              variant="contained"
              margin="normal"
              fullWidth
              sx={{ marginTop: "20px" }}
              endIcon={<SendIcon />}
              type="submit"
            >
              CREAR
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
