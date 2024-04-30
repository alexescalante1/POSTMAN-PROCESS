import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { DtDesingMicroServicesCls } from "../../../../Data";
import { Alertas } from "../../../GenComponents";
import {
  ObjTreeMicroServices,
  GetTipoNodoFn,
  GetColorNodoFn,
} from "../../../../Domain/Services";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RegistrarNuevoNodo = ({
  openRegNewNodo,
  handleCloseRegNodo,
  objProject,
  idNodoPadre,
  setEndNode,
}) => {
  const [nombreNodo, setNombreNodo] = useState("");
  const [descripNodo, setDescripNodo] = useState("");
  const [listTipo, setListTipo] = React.useState([]);
  const [tipo, setTipo] = React.useState("");
  const [estiloNodo, setEstiloNodo] = useState({
    colorText: "#ffffff",
    colorFondo: "#ff0000",
  });

  useEffect(() => {
    const lvl = ObjTreeMicroServices.SearchTree(idNodoPadre)?.nivel;
    setListTipo(GetTipoNodoFn(lvl == null ? 0 : lvl + 1).ListData);
    setTipo(GetTipoNodoFn(lvl == null ? 0 : lvl + 1).select);
    setEstiloNodo(
      GetColorNodoFn(GetTipoNodoFn(lvl == null ? 0 : lvl + 1).select)
    );
  }, [idNodoPadre]);

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
    setEstiloNodo(GetColorNodoFn(event.target.value));
  };

  const registrarNodo = async (e) => {
    e.preventDefault();
    try {
      let data = await new DtDesingMicroServicesCls().SetNewNodo({
        idProject: objProject?.id,
        idPadre: idNodoPadre,
        cTipoNodo: tipo,
        cTitulo: nombreNodo,
        cDescripcion: descripNodo,
        objEstilo: {
          cColorFondo: estiloNodo?.colorFondo,
          cColorTexto: estiloNodo?.colorText,
          nBorderRadius: 7,
        },
      });

      if (data) {
        Alertas("success", "Nuevo Nodo Creado.");
        setEndNode(data);
        setNombreNodo("");
        setDescripNodo("");
        setEstiloNodo({
          colorText: "#ffffff",
          colorFondo: "#ff0000",
        });
        handleCloseRegNodo();
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  return (
    <>
      <Dialog
        open={openRegNewNodo}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseRegNodo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <Typography flex={2} variant="h5" style={{ fontWeight: "bold" }}>
                {"CREAR NUEVO NODO"}
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={handleCloseRegNodo}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={registrarNodo}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipo}
                label="Tipo"
                onChange={handleChangeTipo}
              >
                {listTipo.map((objeto, index) => (
                  <MenuItem key={index} value={objeto.key}>
                    {objeto.value}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                id="nameProjec"
                margin="dense"
                fullWidth
                label="Nombre"
                className="mb-4"
                onChange={(e) => setNombreNodo(e.target.value)}
                value={nombreNodo}
              />
              <TextField
                id="descProjec"
                margin="dense"
                fullWidth
                label="Descripción"
                className="mb-4"
                onChange={(e) => setDescripNodo(e.target.value)}
                value={descripNodo}
                multiline
                rows={4}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    fullWidth
                    type="color"
                    label="Color de Fondo"
                    id="fullWidth"
                    className="mb-4"
                    onChange={(e) =>
                      setEstiloNodo({
                        colorText: estiloNodo?.colorText,
                        colorFondo: e.target.value,
                      })
                    }
                    value={estiloNodo?.colorFondo}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    fullWidth
                    type="color"
                    label="Color del Texto"
                    id="fullWidth"
                    className="mb-4"
                    onChange={(e) =>
                      setEstiloNodo({
                        colorText: e.target.value,
                        colorFondo: estiloNodo?.colorFondo,
                      })
                    }
                    value={estiloNodo?.colorText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>
            <Button
              variant="contained"
              margin="normal"
              fullWidth
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
};
