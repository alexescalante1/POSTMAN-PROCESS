import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import DeleteIcon from "@mui/icons-material/Delete";
import AnchorIcon from "@mui/icons-material/Anchor";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RegRelNodos } from "./RegRelNodos";
import { DetalleCohesion } from "./DetalleCohesion";
import { Alertas } from "../../../../GenComponents";
import { DtDesingMicroServicesCls } from "../../../../../Data";
import { ObjTreeMicroServices } from "../../../../../Domain/Services";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MenuNodo = ({
  menuOpen,
  setMenuOpen,
  setObjMove,
  setReflesh,
  objMicroService,
  handleVisitPage,
}) => {
  const [openRelNodos, setOpenRelNodos] = useState(false);
  const open = Boolean(menuOpen);

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClick = (e) => {
    setMenuOpen(e.currentTarget);
  };

  const [openDelet, setOpenDelet] = React.useState(false);

  const handleClickOpenDelet = () => {
    setOpenDelet(true);
  };

  const handleCloseDelet = () => {
    setOpenDelet(false);
  };

  const DeletNodo = async () => {
    ObjTreeMicroServices.DeleteNode(objMicroService?.id);
    setReflesh(true);
    ObjTreeMicroServices.GetNodesInferiores(objMicroService?.id).forEach(
      async (e) => {
        await new DtDesingMicroServicesCls().DeleteNode(e.objData.id);
      }
    );
    await new DtDesingMicroServicesCls().DeleteNode(objMicroService?.id);
    Alertas("success", "Nodo Eliminado.");
  };

  const handleClose = async (e, tipo) => {
    e.preventDefault();
    switch (tipo) {
      case 1:
        handleVisitPage({
          id: objMicroService?.id,
          cNivel: objMicroService?.cTipoNodo,
          cTitulo: objMicroService?.cTitulo,
        });
        break;
      case 2:
        const TipoNodo = ObjTreeMicroServices.SearchTree(objMicroService?.id)
          ?.objData?.cTipoNodo;
        if (
          TipoNodo != "MicroService" &&
          TipoNodo != "Capa" &&
          TipoNodo != "Class"
        ) {
          setOpenRelNodos(true);
        } else {
          Alertas("error", "Este Nodo no puede tener relaciones.");
        }
        break;
      default:
        setMenuOpen(false);
        break;
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          transform: "translate(30%, 8%)",
          marginRight: "5px",
          marginLeft: "5px",
        }}
      >
        <SettingsIcon />
      </div>

      {open === true ? (
        <>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={menuOpen}
            open={open}
            onClose={(e) => handleClose(e, 0)}
          >
            <MenuItem onClick={(e) => handleClose(e, 1)} disableRipple>
              <RemoveRedEyeIcon />
              Visualizar
            </MenuItem>
            <MenuItem onClick={(e) => handleClose(e, 2)} disableRipple>
              <AnchorIcon />
              Relacionar
            </MenuItem>
            {/* <MenuItem onClick={(e) => handleClose(e, 3)} disableRipple>
              <EditIcon />
              Editar
            </MenuItem> */}
            <MenuItem onClick={handleClickOpen2} disableRipple>
              <SsidChartIcon />
              Cohesión
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClickOpenDelet} disableRipple>
              <DeleteIcon />
              Eliminar
            </MenuItem>
          </StyledMenu>
          <RegRelNodos
            openRelNodos={openRelNodos}
            setOpenRelNodos={setOpenRelNodos}
            setMenuOpen={setMenuOpen}
            setObjMove={setObjMove}
            objMicroService={objMicroService}
          />
          <Dialog
            fullScreen
            open={open2}
            onClose={handleClose2}
            TransitionComponent={Transition}
          >
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
            <DetalleCohesion idNode={objMicroService?.id} />
          </Dialog>
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
              <Button variant="contained" color="success" onClick={handleCloseDelet}>Cancelar</Button>
              <Button variant="contained" color="error" onClick={DeletNodo} autoFocus>
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
