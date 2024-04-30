import React, { useRef, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { ObjTreeMicroServices } from "../../../../../Domain/Services";
import { useGlobalContext } from "../../../../../GlobalContext";
import { DtDesingMicroServicesCls } from "../../../../../Data";
import { MenuNodo } from "./MenuNodo";

//==============================================================================================
//==============================================================================================
//RECTANGULO
//==============================================================================================
//==============================================================================================

export const GraphMicroService = ({
  objMicroService,
  setObjMove,
  setReflesh,
  handleVisitPage,
}) => {
  const rectangleRef = useRef(null);
  const [divProps, setDivProps] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [saveDragging, setSaveDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [position, setPosition] = useState({
    x: objMicroService?.objProp?.objPosition?.nPointX,
    y: objMicroService?.objProp?.objPosition?.nPointY,
  });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isDragging && menuOpen === null) {
      const rect = rectangleRef.current.getBoundingClientRect();
      const Pos = {
        x: position.x + e.clientX - rect.left - divProps.width / 2,
        y: position.y + e.clientY - rect.top - divProps.height / 2,
      };
      // const Pos = {
      //   x: e.clientX - divProps.width / 2,
      //   y: e.clientY - divProps.height / 2,
      // };

      if (!saveDragging) {
        setSaveDragging(true);
        GuardarCambiosPos();
      }
      setObjMove({});

      setPosition(Pos);
      UpdateObject();
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (rectangleRef.current) {
      setDivProps({
        width: rectangleRef.current.clientWidth,
        height: rectangleRef.current.clientHeight,
      });
    }
  }, []);

  let autoSaveTimer;
  const GuardarCambiosPos = async () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(async () => {
      await new DtDesingMicroServicesCls().SetEditNodo(
        objMicroService?.id,
        ObjTreeMicroServices.Search(objMicroService?.id)
      );
      setSaveDragging(false);
    }, 3000);
  };

  const UpdateObject = () => {
    new DtDesingMicroServicesCls().SetPosNodo(
      {
        nPointX: position.x,
        nPointY: position.y,
        nAncho: rectangleRef.current.clientWidth,
        nAlto: rectangleRef.current.clientHeight,
      },
      objMicroService
    );
  };

  return (
    <>
      <div
        ref={rectangleRef}
        style={{
          position: "absolute",
          backgroundColor: `${objMicroService?.objEstilo?.cColorFondo}`,
          color: `${objMicroService?.objEstilo?.cColorTexto}`,
          userSelect: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: `${objMicroService?.objEstilo?.nBorderRadius}px`,
          padding: "12px",
          maxWidth: "300px",
          minHeight: "70px",
          top: `${position.y}px`,
          left: `${position.x}px`,
          zIndex: 1,
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            fontSize: "11px",
            position: "absolute",
            transform: "translate(0%, -160%)",
            marginRight: "5px",
            marginLeft: "5px",
          }}
        >
          {objMicroService?.cTipoNodo}&nbsp;+&nbsp;
          {
            ObjTreeMicroServices.SearchTree(objMicroService?.id)?.listRelations
              .length
          }
        </div>
        {objMicroService?.cTitulo}
        <MenuNodo
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setObjMove={setObjMove}
          setReflesh={setReflesh}
          objMicroService={objMicroService}
          handleVisitPage={handleVisitPage}
        />
      </div>
    </>
  );
};

//==============================================================================================
//==============================================================================================
//LINEA
//==============================================================================================
//==============================================================================================

export function GraphRelaciones({ objMove, idNodoPadre }) {
  const [listPoints, setListPoints] = useState([]);
  const { state } = useGlobalContext();
  const [mode, setMode] = React.useState("red");
  useEffect(() => {
    setMode(state?.mode === "light" ? "black" : "white");
  }, [state]);

  useEffect(() => {
    //console.log(objMove)
    const lstP = [];
    ObjTreeMicroServices.GetRelAllNode(idNodoPadre).forEach((NodoOrg) => {
      NodoOrg?.NodoDestino?.forEach((NodoDest) => {
        lstP.push({
          sX:
            NodoOrg?.NodoOrigen?.objProp?.objPosition?.nPointX +
            NodoOrg?.NodoOrigen?.objProp?.nAncho / 2,
          sY:
            NodoOrg?.NodoOrigen?.objProp?.objPosition?.nPointY +
            NodoOrg?.NodoOrigen?.objProp?.nAlto / 2,
          eX:
            NodoDest?.objProp?.objPosition?.nPointX +
            NodoDest?.objProp?.nAncho / 2,
          eY:
            NodoDest?.objProp?.objPosition?.nPointY +
            NodoDest?.objProp?.nAlto / 2,
          border: 3,
          color: mode,
        });
      });
    });
    setListPoints(lstP);
  }, [objMove]);

  return (
    <>
      {listPoints?.map((Nodo, index) => (
        <GraphLine
          key={index}
          startX={Nodo?.sX}
          startY={Nodo?.sY}
          endX={Nodo?.eX}
          endY={Nodo?.eY}
          nBorder={Nodo?.border}
          color={mode}
        />
      ))}
    </>
  );
}

export const GraphLine = ({ startX, startY, endX, endY, nBorder, color }) => {
  return (
    <div
      style={{
        position: "absolute",
        transformOrigin: "top left",
        borderRadius: "2px",
        border: `${nBorder}px solid ${color}`,
        top: `${startY}px`,
        left: `${startX}px`,
        width: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2),
        transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`,
        zIndex: 1,
      }}
    ></div>
  );
};
