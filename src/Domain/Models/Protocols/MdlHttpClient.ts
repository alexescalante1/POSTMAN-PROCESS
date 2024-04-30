export type MdlHttpRequest = {
  url: string;
  method: MdlHttpMethod;
  body?: any;
  headers?: any;
};

export type MdlHttpMethod = "post" | "get" | "put" | "delete" | string;

export enum EnmHttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type MdlHttpResponse<T = any> = {
  statusCode: EnmHttpStatusCode;
  body?: T;
};
