import {
  MdlHttpRequest,
  MdlHttpResponse,
  MdlHttpMethod,
  EnmHttpStatusCode,
} from "../../Models/Protocols/MdlHttpClient";

export interface IHttpClient {
  QueryRequest: (data: IHttpClient.NsHttpRequest) => Promise<IHttpClient.NsHttpResponse>;
}

export namespace IHttpClient {
  export type NsHttpStatusCode = EnmHttpStatusCode;
  export type NsHttpMethod = MdlHttpMethod;
  export type NsHttpRequest = MdlHttpRequest;
  export type NsHttpResponse = MdlHttpResponse;
}
