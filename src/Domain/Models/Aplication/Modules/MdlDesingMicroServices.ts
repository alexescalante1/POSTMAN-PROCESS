import { MdlBaseResponse } from "../Base/MdlBaseResponse";

export type MdlProjectMicroServ = {
  id: string;
  nombre: string;
  descrip: string;
  fecha: Date;
  editar: number;
};

export type MdlMicroServicesRequest = {
  cProyecto: string;
};

export type MdlMicroServicesResponse = {
  header: MdlBaseResponse;
  dataMicroServices: MdlNodoMicroService[];
  dataRelNodes: MdlThreeNodoRel[];
};

export type MdlNodoMicroService = {
  idProject: string;
  id: string;
  idPadre: string;
  cTipoNodo: string;
  cTitulo: string;
  cDescripcion: string;
  cFecha: Date;
  objEstilo: objStyleMcSrv;
  objProp: MdlMicroServiceProp;
};

export type MdlThreeNodoRel = {
  idProject: string;
  NodoOrigen: string;
  NodoDestino: string[];
};

export type MdlNodoOrgDest = {
  NodoOrigen: MdlNodoRelac;
  NodoDestino: MdlNodoRelac[];
};

export type MdlNodoRelac = {
  id: string;
  cTitulo: string;
  objProp: MdlMicroServiceProp;
};

export type MdlMicroServiceProp = {
  objPosition: MdlPoint;
  nAncho: number;
  nAlto: number;
  lBloqueado: boolean;
};

export type MdlMicroServiceRelacLine = {
  idOrden: number;
  listPoints: MdlPoint[];
};

export type MdlPoint = {
  nPointX: number;
  nPointY: number;
};

export type objStyleMcSrv = {
  cColorFondo: string;
  cColorTexto: string;
  nBorderRadius: number;
};
