import React, { useEffect, useState } from "react";
import DesingMicroServicesStyle from "./DesingMicroServices.module.css";
import { GraphMicroService, GraphRelaciones } from "./MapGraph/Graphics";
import { DtDesingMicroServicesCls } from "../../../../Data";
import { ObjTreeMicroServices } from "../../../../Domain/Services";

export function MapGraph({
  endNode,
  setEndNode,
  objProject,
  idNodoPadre,
  handleVisitPage,
  reflesh,
  setReflesh,
}) {
  const [objMicroService, setMicroService] = useState([]);
  const [objMove, setObjMove] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new DtDesingMicroServicesCls().GetMicroServices(objProject?.id);
        setReflesh(true);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (endNode) {
      ObjTreeMicroServices.Insert(endNode);
      setReflesh(true);
      setEndNode(null);
    }
  }, [endNode]);

  useEffect(() => {
    if (reflesh) {
      ObjTreeMicroServices.SetObjDadChilldren();
      ObjTreeMicroServices.SetNodesByNivel();
      ObjTreeMicroServices.SetNodesByNivelAndRelation();
      ObjTreeMicroServices.SetDependents();
      setMicroService(ObjTreeMicroServices.GetAllNodesByPadre(idNodoPadre));
      setObjMove({});
      setReflesh(false);
    }
  }, [reflesh]);

  return (
    <>
      <div className={DesingMicroServicesStyle.DivContent}>
        <GraphRelaciones objMove={objMove} idNodoPadre={idNodoPadre} />
        {objMicroService.map((objeto) => (
          <GraphMicroService
            key={objeto?.id}
            objMicroService={objeto}
            setObjMove={setObjMove}
            setReflesh={setReflesh}
            handleVisitPage={handleVisitPage}
          />
        ))}
      </div>
    </>
  );
}
