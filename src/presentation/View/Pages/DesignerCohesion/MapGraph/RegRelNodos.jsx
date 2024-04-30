import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import {
  ObjTreeMicroServices,
  GetTipoNodoFn,
} from "../../../../../Domain/Services";
import { DtDesingMicroServicesCls } from "../../../../../Data";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RegRelNodos = ({
  openRelNodos,
  setOpenRelNodos,
  setMenuOpen,
  setObjMove,
  objMicroService,
}) => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [listMicroServices, SetListMicroServices] = useState([]);
  const [idMicroServ, SetIdMicroServ] = useState("");
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleClose = () => {
    setOpenRelNodos(false);
    setMenuOpen(null);
  };

  useEffect(() => {
    setLeft(
      ObjTreeMicroServices.GetListRelsByNode(objMicroService?.id).sort(
        (a, b) => a.nivel - b.nivel
      )
    );
    setRight(
      ObjTreeMicroServices.GetRelOutAllNode(
        objMicroService?.id,
        idMicroServ
      ).sort((a, b) => a.nivel - b.nivel)
    );
  }, [idMicroServ]);

  useEffect(() => {
    SetListMicroServices(
      ObjTreeMicroServices.GetListGroupRelations(objMicroService?.id)
    );
    SetIdMicroServ("0");
  }, []);

  const handleChangeTipo = (event) => {
    SetIdMicroServ(event.target.value);
  };

  const regRelNodes = async (e) => {
    e.preventDefault();
    try {
      let data = await new DtDesingMicroServicesCls().SetRelacNodo({
        idProject: objMicroService?.idProject,
        NodoOrigen: objMicroService?.id,
        NodoDestino: left.map((objeto) => objeto?.objData?.id),
      });

      ObjTreeMicroServices.InsertRelaciones(
        objMicroService?.id,
        left.map((objeto) => objeto?.objData?.id)
      );
      ObjTreeMicroServices.SetNodesByNivelAndRelation();
      ObjTreeMicroServices.SetDependents();
      setObjMove({});
    } catch (e) {
      console.error("Error fetching data:", e);
    }
    setMenuOpen(null);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked).sort((a, b) => a.nivel - b.nivel));
    setLeft(not(left, leftChecked).sort((a, b) => a.nivel - b.nivel));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked).sort((a, b) => a.nivel - b.nivel));
    setRight(not(right, rightChecked).sort((a, b) => a.nivel - b.nivel));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 330,
          height: 400,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, index) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={index} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  <>
                    <h3
                      style={{
                        color: "green",
                        margin: "0",
                        fontWeight: "bold",
                      }}
                    >
                      {value?.objData?.cTitulo}
                    </h3>
                    <h5 style={{ margin: "0", fontWeight: "bold" }}>
                      {"Lvl " + value?.nivel + " | "}
                      <span
                        style={{
                          color: value?.dad?.objData?.objEstilo?.cColorFondo,
                        }}
                      >
                        {value?.dad?.objData?.cTitulo}
                      </span>
                      {" | "}
                      <span
                        style={{
                          color: value?.objData?.objEstilo?.cColorFondo,
                        }}
                      >
                        {value?.objData?.cTipoNodo}
                      </span>
                    </h5>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      {openRelNodos === true ? (
        <>
          <Dialog
            open={openRelNodos}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <Typography
                    flex={2}
                    variant="h5"
                    style={{ fontWeight: "bold" }}
                  >
                    {"DEPENDENCIAS DE (" + objMicroService?.cTitulo + ")"}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Seleccione Microservicio
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idMicroServ}
                  label="Seleccione Microservicio"
                  onChange={handleChangeTipo}
                  sx={{ marginBottom: "15px" }}
                >
                  {listMicroServices.map((objeto, index) => (
                    <MenuItem key={index} value={objeto.key}>
                      {objeto.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>{customList("DEPENDENCIAS", left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="contained"
                      size="normal"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="contained"
                      size="normal"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList("NODOS", right)}</Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                endIcon={<SendIcon />}
                onClick={regRelNodes}
              >
                GUARDAR
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
