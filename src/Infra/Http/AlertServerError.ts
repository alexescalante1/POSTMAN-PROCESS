import { EnmHttpStatusCode } from "../../Domain/Models/Protocols/MdlHttpClient";
import { Alertas } from "../../presentation/GenComponents";

export class AlertServerErrorCls {
  AlertStatusCode(statusCode: EnmHttpStatusCode): void {
    switch (statusCode) {
      case EnmHttpStatusCode.ok:
        //Alertas("success", "Code " + HttpStatusCode.ok + ": Success.");
        break;
      case EnmHttpStatusCode.noContent:
        Alertas(
          "error",
          "Error " + EnmHttpStatusCode.noContent + ": Sin Contenido."
        );
        break;
      case EnmHttpStatusCode.badRequest:
        Alertas(
          "error",
          "Error " + EnmHttpStatusCode.badRequest + ": Solicitud Incorrecta."
        );
        break;
      case EnmHttpStatusCode.unauthorized:
        Alertas(
          "error",
          "Error " + EnmHttpStatusCode.unauthorized + ": No autorizado."
        );
        break;
      case EnmHttpStatusCode.forbidden:
        Alertas("error", "Error " + EnmHttpStatusCode.forbidden + ": Prohibido.");
        break;
      case EnmHttpStatusCode.notFound:
        Alertas(
          "error",
          "Error " + EnmHttpStatusCode.notFound + ": No Encontrado."
        );
        break;
      case EnmHttpStatusCode.serverError:
        Alertas(
          "error",
          "Error " + EnmHttpStatusCode.serverError + ": Error de servidor."
        );
        break;
      default:
        Alertas("error", "Error de Servidor: Inesperado.");
    }
  }
}
