import { MdlApiContextResponse } from "../../Domain/Models";
import { FragmentData } from "../Utilities/FragmentStorage/FragmentData";

export function ApiContextRequest(idmenu: string): MdlApiContextResponse {
  const DtEnPts = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "EPlg"
  );

  let DB = [
    {
      idMenu: "",
      idEndpoint: "10000",
      cEndpoint: "login",
      cPath: "api/authentication/login",
      cMethod: "POST",
      cRoute: "",
      dFechaModificacion: "05/11/2022",
    },
    {
      idMenu: "",
      idEndpoint: "10001",
      cEndpoint: "user-apps",
      cPath: "api/authentication/get/user-apps",
      cMethod: "GET",
      cRoute: "",
      dFechaModificacion: "05/11/2022",
    },
    {
      idMenu: "",
      idEndpoint: "10002",
      cEndpoint: "user-app-menus",
      cPath: "api/authentication/get/user-app-menus?",
      cMethod: "GET",
      cRoute: "",
      dFechaModificacion: "05/11/2022",
    },
  ];

  if (DtEnPts) {
    DB = DB.concat(JSON.parse(DtEnPts));
  }

  const menu = DB.find((e: any) => e?.idEndpoint === idmenu);

  if (menu) {
    return {
      cPath: menu?.cPath,
      cMethod: menu?.cMethod,
    };
  } else {
    return {
      cPath: "ErrorDeAcceso",
      cMethod: "ErrorDeAcceso",
    };
  }
}
