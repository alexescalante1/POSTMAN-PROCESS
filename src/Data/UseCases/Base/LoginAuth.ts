import { IInicializacion } from "../../../Domain/Interfaces";
import { AxiosHttpClientCls, AlertServerErrorCls } from "../../../Infra/Http";
import { Alertas } from "../../../presentation/GenComponents";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";

export async function GetLoginAuthFn(
  url: string,
  method: string,
  params: IInicializacion.NsLoginAuthRequest
): Promise<IInicializacion.NsLoginAuthResponse> {
  const httpResponse = await new AxiosHttpClientCls().QueryRequest({
    url: url,
    method: method,
    body: params,
  });

  let ObjData = httpResponse?.body?.data;
  new AlertServerErrorCls().AlertStatusCode(httpResponse.statusCode);

  if (httpResponse?.body?.success == 1) {
    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
        "Tulg",
        JSON.stringify({
          Tk: ObjData?.cToken,
          lEstado: ObjData?.user?.lEstado,
        })
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD2",
        "Frt",
        JSON.stringify({
          APrf: ObjData?.cToken,
        })
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD2",
        "TCrt",
        JSON.stringify({
          Tme: new Date(new Date().getTime() + ObjData?.nExpireIn * 60000),
        })
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR96TU2A5E8Y5FDD1",
        "Udlg",
        JSON.stringify({
          cPrimerNombre: ObjData?.user?.cPrimerNombre,
          cSegundoNombre: ObjData?.user?.cSegundoNombre,
          cDocumento: ObjData?.user?.cDocumento,
          idUsuario: ObjData?.user?.idUsuario,
          cDireccion: ObjData?.user?.cDireccion,
          cCelular: ObjData?.user?.cCelular,
          cEmail: ObjData?.user?.cEmail,
          dFechaModificacion: ObjData?.user?.dFechaModificacion,
        })
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }
  } else {
    Alertas("error", "Petición Fallida.");
  }

  return {
    header: {
      code: httpResponse.statusCode,
      success: httpResponse?.body?.success,
      message: httpResponse?.body?.message,
      errors: httpResponse?.body?.errors,
    },
    data: {
      cPrimerNombre: ObjData?.user?.cPrimerNombre,
      cSegundoNombre: ObjData?.user?.cSegundoNombre,
      lEstado: ObjData?.user?.lEstado,
    },
  };
}
