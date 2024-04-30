import React, { useState } from "react";
import { RegistrarNuevoNodo } from "./RegistrarNuevoNodo";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import SsidChartIcon from "@mui/icons-material/SsidChart";

import MicrosoftIcon from "@mui/icons-material/Microsoft";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DetalleCohesion } from "./MapGraph/DetalleCohesion";
//import { ObjTreeMicroServices } from "../../../../../Domain/Services";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function SpeedDialog({ objProject, setEndNode, idNodoPadre }) {
  const [openRegNewNodo, setOpenRegNewNodo] = useState(false);

  const handleOpenRegNodo = () => {
    setOpenRegNewNodo(true);
  };

  const handleCloseRegNodo = () => {
    setOpenRegNewNodo(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle={"New Nodo"}
          onClick={handleOpenRegNodo}
        />
        <SpeedDialAction
          icon={<SsidChartIcon />}
          tooltipTitle={"Estadisticas"}
          onClick={handleClickOpen2}
        />
      </SpeedDial>
      {openRegNewNodo === true ? (
        <RegistrarNuevoNodo
          openRegNewNodo={openRegNewNodo}
          handleCloseRegNodo={handleCloseRegNodo}
          objProject={objProject}
          idNodoPadre={idNodoPadre}
          setEndNode={setEndNode}
        />
      ) : (
        <></>
      )}

      <Dialog
        fullScreen
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Transition}
      >
        {open2 === true ? (
          <>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton edge="start" color="inherit">
                  <MicrosoftIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 2 }}
                  variant="h6"
                  component="div"
                >
                  DETALLE DEL NODO
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  onClick={handleClose2}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DetalleCohesion idNode={idNodoPadre} />
          </>
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
}
