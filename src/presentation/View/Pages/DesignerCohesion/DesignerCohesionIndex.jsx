import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { RegistrarNuevoProyecto } from "./RegistrarNuevoProyecto";
import { CardProyecto } from "./CardProyecto";

export function DesignerCohesionIndex() {
  const [reload, setReload] = useState("");

  //CADA NODO ALMACENA UN OBJETO DE ENTRA DA Y SALIDA
  //EL NODO PUEDE TENER FUNCIONALIDADES DENTRO

  //OTROS NODOS PUEDEN EFECUTAR FUNCIONALIDAD SOBRE UN ELEMENTO DEL NODO

  //===============================================
  //MY NODO DECLARATIVO

  //inNodo Puede ser object o lista de objects o lista de valores

  useEffect(() => {
    // let inNodo = `[
    //   {
    //     "user": "Alex",
    //     "passwd": "Password"
    //   },
    //   {
    //     "user": "Alex2",
    //     "passwd": "Password"
    //   },
    //   {
    //     "user": "Alex3",
    //     "passwd": "Password"
    //   },
    //   {
    //     "user": "Alex4",
    //     "passwd": "Password"
    //   }
    // ]`;

    let inNodo = `
      {
        "user": "Alex",
        "passwd": "Password",
        "pais": "Peru",
        "edad": 22
      }
    `;

    let jsonRes = JSON.parse(inNodo);

    if (Array.isArray(jsonRes)) {
      jsonRes.forEach((x) => {
        let atributos = Object.keys(x);
        console.log(atributos);
      });
    } else if (typeof jsonRes === "object") {
      let atributos = Object.keys(jsonRes);
      atributos.forEach(x => {
        console.log(jsonRes[x]);
      });
      console.log(atributos);
    } else {
      console.log("ninguna");
    }


    // let dato = "Hola";
    // console.log(typeof dato);
    


  }, []);

  //===============================================

  // let miCadena = `{
  //     "user": "uBtnNiubiz",
  //     "passwd": "1234567"
  // }`;

  // let objeto = JSON.parse(miCadena);

  // console.log(objeto);

  // let miCadena = `{
  //     "user": "string",
  //     "passwd": "string"
  // }`;
  // let estructura;
  // eval(`
  //     estructura = JSON.parse(miCadena);
  // `);
  // console.log(estructura);
  // eval(`
  //     estructura.user = "uBtnNiubiz";
  //     estructura.passwd = "1234567";
  //     estructura.Dato = "1234567";
  // `);
  // console.log(estructura);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                width: "100%",
                height: "700px",
              }}
            >
              <h1>HOLA</h1>
              <RegistrarNuevoProyecto setReload={setReload} />
              <CardProyecto reload={reload} setReload={setReload} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
