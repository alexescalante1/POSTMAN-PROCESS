import { MdlAuthResponse, MdlAuthRequest } from "../../../Models";

export interface IInicializacion {
  GetLoginAuth: (
    body: IInicializacion.NsLoginAuthRequest
  ) => Promise<IInicializacion.NsLoginAuthResponse>;
  GetInitConfig: (url2: string, method2: string) => Promise<boolean>;
}

export namespace IInicializacion {
  export type NsLoginAuthRequest = MdlAuthRequest;
  export type NsLoginAuthResponse = MdlAuthResponse;
  export type NsInitConfigResponse = boolean;
}
