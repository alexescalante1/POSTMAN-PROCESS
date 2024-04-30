import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DtDesingMicroServicesCls } from "../../../../Data";
import { ObjTreeMicroServices } from "../../../../Domain/Services";
import { FullDialogDiagrama } from "./FullDialogDiagrama";
import { Alertas } from "../../../GenComponents";

export const CardProyecto = ({ reload, setReload }) => {
  const [open, setOpen] = useState(false);
  const [objProject, setDataProject] = useState(false);
  const [listProjects, setProjects] = useState([]);

  const handleClickOpen = (data) => {
    setOpen(true);
    setDataProject(data);
  };

  const handleClose = () => {
    setOpen(false);
    ObjTreeMicroServices.DeleteAllTree();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await new DtDesingMicroServicesCls().GetAllProject();
        setProjects(data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData();
  }, [reload]);

  const [openDelet, setOpenDelet] = React.useState(false);

  const handleClickOpenDelet = (item, e) => {
    e.preventDefault();
    setDataProject(item);
    setOpenDelet(true);
  };

  const handleCloseDelet = () => {
    setOpenDelet(false);
  };

  const EliminarProject = async (e) => {
    e.preventDefault();
    console.log(objProject);
    try {
      let data = await new DtDesingMicroServicesCls().DeleteProject(objProject?.id);
      if (data) {
        Alertas("error", "Se elimino el proyecto.");
        setReload(data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
    setOpenDelet(false);
  };

  return (
    <>
      {listProjects?.map((item, index) => (
        <Box sx={{ minWidth: 275, marginBottom: 2 }} key={index}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                {item?.nombre}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Project
              </Typography>
              <Typography variant="body2">{item?.descrip}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                endIcon={<RemoveRedEyeIcon />}
                onClick={() => handleClickOpen(item)}
              >
                Ver Diagrama
              </Button>
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={(e) => handleClickOpenDelet(item, e)}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
      <FullDialogDiagrama
        objProject={objProject}
        handleClose={handleClose}
        open={open}
      />
      <Dialog
        open={openDelet}
        onClose={handleCloseDelet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta seguro de eliminar este Nodo?"}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseDelet}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => EliminarProject(e)}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
