import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { ObjTreeMicroServices } from "../../../../../Domain/Services";
import Chart from "chart.js/auto";
import { CSVLink } from "react-csv";
import { Margin } from "@mui/icons-material";

export const DetalleCohesion = ({ idNode }) => {
  //const chartRefCohesionQueue = useRef(null);
  const chartInstanceCohesionQueue = useRef(null);
  const chartRefCohesionClass = useRef(null);
  const chartInstanceCohesionClass = useRef(null);
  const [node, setNode] = useState({});
  const [cohesion, setCohesion] = useState({
    CohesionQueue: 0,
    CohesionClass: 0,
  });

  const [data, setData] = useState([
    ["Class Name", "Cohesion QueQue", "Cohesion Class"],
  ]);

  useEffect(() => {
    setNode(ObjTreeMicroServices.SearchTree(idNode));
  }, []);

  useEffect(() => {
    if (node?.objData?.cTipoNodo === "MicroService") {
      let listResCohesion = [];
      ObjTreeMicroServices.CohesionByMicroService(idNode).forEach((e) => {
        listResCohesion.push([
          e.className,
          e.classData.CohesionQueue,
          e.classData.CohesionClass,
        ]);
      });
      setData([
        ["Class Name", "Cohesion QueQue", "Cohesion Class"],
        ...listResCohesion,
      ]);
      setCohesion({
        CohesionQueue:
          listResCohesion.reduce(
            (acumulador, objeto) => acumulador + objeto[1],
            0
          ) / listResCohesion.length,
        CohesionClass:
          listResCohesion.reduce(
            (acumulador, objeto) => acumulador + objeto[2],
            0
          ) / listResCohesion.length,
      });
    } else {
      setCohesion(ObjTreeMicroServices.CohesionByDad(idNode));
    }
  }, [node]);

  useEffect(() => {
    if (chartInstanceCohesionClass.current) {
      //chartInstanceCohesionQueue.current.destroy();
      chartInstanceCohesionClass.current.destroy();
    }
    // const MyChartRefCohesionQueue =
    //   chartRefCohesionQueue.current.getContext("2d");
    // chartInstanceCohesionQueue.current = new Chart(MyChartRefCohesionQueue, {
    //   type: "pie",
    //   data: {
    //     labels: ["Cohesion Queue: " + (Math.round((cohesion?.CohesionQueue * 100) * 1000) / 1000), "Resto"],
    //     datasets: [
    //       {
    //         label: "# of votes",
    //         data: [
    //           cohesion?.CohesionQueue * 100,
    //           100 - cohesion?.CohesionQueue * 100,
    //         ],
    //         backgroundColor: [
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(255, 99, 132, 0.2)",
    //         ],
    //         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
    //         borderWidth: 2,
    //       },
    //     ],
    //   },
    // });
    const MyChartRefCohesionClass =
      chartRefCohesionClass.current.getContext("2d");
    chartInstanceCohesionClass.current = new Chart(MyChartRefCohesionClass, {
      type: "pie",
      data: {
        labels: ["Cohesion Class: " + (Math.round((cohesion?.CohesionClass * 100) * 1000) / 1000), "Resto"],
        datasets: [
          {
            label: "# of votes",
            data: [
              cohesion?.CohesionClass * 100,
              100 - cohesion?.CohesionClass * 100,
            ],
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 2,
          },
        ],
      },
    });
    return () => {
      if (chartInstanceCohesionQueue.current) {
        chartInstanceCohesionQueue.current.destroy();
        chartInstanceCohesionClass.current.destroy();
      }
    };
  }, [cohesion]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <h1>
        {node === null
          ? "PROJECT COHESION"
          : node?.objData?.cTipoNodo + " - " + node?.objData?.cTitulo}
      </h1>
      
      <CSVLink
        data={data}
        className="exportButton"
        filename={"CohesionDeClaseMS_" + node?.objData?.cTitulo + ".csv"}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "green", height: "30px" }}
          fullWidth
          endIcon={<SummarizeIcon />}
        >
          Descargar Reporte de Cohesion de Clase
        </Button>
      </CSVLink>
      
      {/* <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
        <canvas
          ref={chartRefCohesionQueue}
          style={{ width: "200px", height: "200px" }}
        />
      </Container> */}
      {/* <h2>Cohesion (Queue) (ACOPLAMIENTO) = {cohesion?.CohesionQueue}</h2>
      {cohesion?.fxCohesionQueue?.map((objeto, index) => (
        <p key={index}>{objeto}</p>
      ))}
      <hr /> */}
      <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
        <canvas
          ref={chartRefCohesionClass}
          style={{ width: "200px", height: "200px" }}
        />
      </Container>
      <h2 style={{ margin: '3px' }} >Group Weight</h2>
      {cohesion?.fxWg?.map((objeto, index) => (
        <p style={{ margin: '0px' }} key={index}>{objeto}</p>
      ))}
      <h2 style={{ margin: '3px' }} >Group Weight Sum</h2>
      {cohesion?.fxSM?.map((objeto, index) => (
        <p style={{ margin: '0px' }} key={index}>{objeto}</p>
      ))}
      <h2 style={{ margin: '3px' }} >Relationship Of Public Methods</h2>
      {cohesion?.fxCohesionClass?.map((objeto, index) => (
        <p style={{ margin: '0px' }} key={index}>{objeto}</p>
      ))}
      <h2 style={{ margin: '3px' }} >Cohesion (Class Queue) = {cohesion?.CohesionClass}</h2>
    </Container>
  );
};
