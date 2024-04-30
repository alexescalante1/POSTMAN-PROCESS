import { MdlBaseResponse } from "./MdlBaseResponse";

export type MdlAuthRequest = {
  cUser: string;
  cPassword: string;
};

export type MdlAuthResponse = {
  header: MdlBaseResponse;
  data: MdlDataAuth;
};

export type MdlDataAuth = {
  cPrimerNombre: string;
  cSegundoNombre: string;
  lEstado: boolean;
};