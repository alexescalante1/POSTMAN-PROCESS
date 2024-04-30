import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FragmentData } from "../Utilities/FragmentStorage/FragmentData";

import {
  DashBoardIndex,
  DesingMicroservices,
  DashboardTest,
  DesignerCohesionIndex,
} from "../../presentation/View";

export default class RoutersApp extends Component {
  state = {
    Refresh: false,
  };

  RefreshData = (e) => {
    this.setState({
      Refresh: (e = true ? false : true),
    });
  };

  render() {
    return (
      <>
        <ValidatorSession RefreshData={this.RefreshData} />
      </>
    );
  }
}

function ValidatorSession({ RefreshData }) {
  //Valida Session
  if (true) {
    // Login in
    return (
      <>
        <AllRutas RefreshData={RefreshData} />
      </>
    );
  } else {
    localStorage.clear();
    window.location.reload(false);
    return (
      // Login Page
      <></>
    );
  }
}

function AllRutas({ RefreshData }) {
  //Construye la pagina
  const { pathname } = useLocation();
  const ArrRutas = pathname.split("/");

  return (
    <>
      {/* <Navbar /> */}

      {/* <ViewAsideApps ArrRutas={ArrRutas} /> */}

      <AllRutasBody ArrRutas={ArrRutas} pathRutas={pathname} />

      {/* <Foother name="InnovaDEV" url="#" /> */}
    </>
  );
}

function AllRutasBody({ ArrRutas, pathname }) {
  //VALIDAR RUTAS EN CASO DE BD AQUI
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashBoardIndex>
                <DesignerCohesionIndex />
              </DashBoardIndex>
            </>
          }
        />
        <Route
          path="/1"
          element={
            <>
              <DashboardTest />
            </>
          }
        />
        <Route
          path="/2"
          element={
            <>
              
            </>
          }
        />

        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
