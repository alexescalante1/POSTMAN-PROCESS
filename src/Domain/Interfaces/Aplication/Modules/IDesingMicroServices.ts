import {
  MdlMicroServicesRequest,
  MdlMicroServicesResponse,
  MdlNodoMicroService,
  MdlMicroServiceRelacLine,
  MdlProjectMicroServ,
  MdlThreeNodoRel,
} from "../../../Models";

export interface IDesingMicroServices {
  SetNewNodo: (
    body: IDesingMicroServices.NsNodoMicroService
  ) => Promise<IDesingMicroServices.NsNodoMicroService>;

  SetRelacNodo: (body: IDesingMicroServices.NsThreeNodoRel) => Promise<string>;

  SetEditNodo: (
    id: string,
    body: IDesingMicroServices.NsNodoMicroService
  ) => Promise<void>;

  SetPosNodo: (
    cambios: any,
    body: IDesingMicroServices.NsNodoMicroService
  ) => void;

  GetMicroServices: (
    body: string
  ) => Promise<IDesingMicroServices.NsMicroServicesResponse>;

  SetNewProject: (
    body: IDesingMicroServices.NsProjectMicroServ
  ) => Promise<string>;

  GetAllProject: () => Promise<IDesingMicroServices.NsProjectMicroServ[]>;

  GetAllRelNodos: () => Promise<IDesingMicroServices.NsThreeNodoRel[]>;

  DeleteProject: (id: string) => Promise<string>;

  DeleteNode: (id: string) => Promise<string>;
}

export namespace IDesingMicroServices {
  export type NsMicroServicesRequest = MdlMicroServicesRequest;
  export type NsMicroServicesResponse = MdlMicroServicesResponse;
  export type NsNodoMicroService = MdlNodoMicroService;
  export type NsMicroServiceRelacLine = MdlMicroServiceRelacLine;
  export type NsProjectMicroServ = MdlProjectMicroServ;
  export type NsThreeNodoRel = MdlThreeNodoRel;
}
