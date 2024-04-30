import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { MapGraph } from "./MapGraph";
import { SpeedDialog } from "./SpeedDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FullDialogDiagrama = ({ objProject, handleClose, open }) => {
  const [reflesh, setReflesh] = useState(false);
  const [endNode, setEndNode] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      {
        id: "0",
        cNivel: "PROYECTO",
        cTitulo: objProject?.nombre,
      },
    ]);
  }, [objProject]);

  const handleVisitPage = (page) => {
    setHistory((prevHistory) => [...prevHistory, page]);
    setReflesh(true);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(updatedHistory);
      setReflesh(true);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MicrosoftIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 2 }} variant="h6" component="div">
            {history[history.length - 1]?.cNivel +
              " - " +
              history[history.length - 1]?.cTitulo}
          </Typography>
          {history.length > 1 ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="ATRAS"
              onClick={handleBack}
              sx={{ marginRight: "20px" }}
            >
              <ReplyAllIcon />
              &nbsp;&nbsp;ATRAS
            </IconButton>
          ) : (
            <></>
          )}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MapGraph
        endNode={endNode}
        setEndNode={setEndNode}
        objProject={objProject}
        idNodoPadre={history[history.length - 1]?.id}
        handleVisitPage={handleVisitPage}
        reflesh={reflesh}
        setReflesh={setReflesh}
      />
      <SpeedDialog
        objProject={objProject}
        setEndNode={setEndNode}
        idNodoPadre={history[history.length - 1]?.id}
      />
    </Dialog>
  );
};
