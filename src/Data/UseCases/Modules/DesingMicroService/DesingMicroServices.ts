import { IDesingMicroServices } from "../../../../Domain/Interfaces";
import {
  AxiosHttpClientCls,
  AlertServerErrorCls,
} from "../../../../Infra/Http";
import { Alertas } from "../../../../presentation/GenComponents";
import { FragmentData } from "../../../../Main/Utilities/FragmentStorage/FragmentData";
import { GenFirebaseServiceCls } from "../../../../Infra/Firebase";
import { ObjTreeMicroServices } from "../../../../Domain/Services";

export async function SetNewNodoFn(
  body: IDesingMicroServices.NsNodoMicroService
): Promise<IDesingMicroServices.NsNodoMicroService> {
  const data: IDesingMicroServices.NsNodoMicroService = {
    idProject: body?.idProject,
    id: "",
    idPadre: body?.idPadre,
    cTipoNodo: body?.cTipoNodo,
    cTitulo: body?.cTitulo,
    cDescripcion: body?.cDescripcion,
    cFecha: new Date(),
    objEstilo: {
      cColorFondo: body?.objEstilo?.cColorFondo,
      cColorTexto: body?.objEstilo?.cColorTexto,
      nBorderRadius: 7,
    },
    objProp: {
      objPosition: {
        nPointX: 40,
        nPointY: 80,
      },
      nAncho: 120,
      nAlto: 70,
      lBloqueado: true,
    },
  };
  const fire = await GenFirebaseServiceCls.SetAddDocument("Nodos", data);
  data.id = fire.toString();
  return data;
}

export function SetPosNodoFn(
  cambios: any,
  body: IDesingMicroServices.NsNodoMicroService
): void {
  const data: IDesingMicroServices.NsNodoMicroService = {
    idProject: body?.idProject,
    id: body?.id,
    idPadre: body?.idPadre,
    cTipoNodo: body?.cTipoNodo,
    cTitulo: body?.cTitulo,
    cDescripcion: body?.cDescripcion,
    cFecha: body?.cFecha,
    objEstilo: {
      cColorFondo: body?.objEstilo?.cColorFondo,
      cColorTexto: body?.objEstilo?.cColorTexto,
      nBorderRadius: body?.objEstilo?.nBorderRadius,
    },
    objProp: {
      objPosition: {
        nPointX: cambios?.nPointX,
        nPointY: cambios?.nPointY,
      },
      nAncho: cambios?.nAncho,
      nAlto: cambios?.nAlto,
      lBloqueado: body?.objProp?.lBloqueado,
    },
  };
  ObjTreeMicroServices.Edit(body?.id, data, null);
}

export async function SetRelacNodoFn(
  params: IDesingMicroServices.NsThreeNodoRel
): Promise<string> {
  const idRelNode = await GenFirebaseServiceCls.GetAllFillDocuments(
    "RelNodos",
    "NodoOrigen",
    "==",
    params?.NodoOrigen
  );
  if (idRelNode.length > 0) {
    await GenFirebaseServiceCls.SetUpdateDocument(
      "RelNodos",
      idRelNode[0]?.id,
      params
    );
  } else {
    await GenFirebaseServiceCls.SetAddDocument("RelNodos", params);
  }
  return idRelNode.toString();
}

export async function SetEditNodoFn(
  id: string,
  params: IDesingMicroServices.NsNodoMicroService
): Promise<void> {
  await GenFirebaseServiceCls.SetUpdateDocument("Nodos", id, params);
}

export async function GetAllRelNodesFn(): Promise<
  IDesingMicroServices.NsThreeNodoRel[]
> {
  const result: IDesingMicroServices.NsThreeNodoRel[] = [];
  const fire = await GenFirebaseServiceCls.GetAllDocuments("RelNodos");
  fire.forEach((item) => {
    result.push(item?.data);
  });
  return result;
}

export async function GetMicroServicesFn(
  idProject: string
): Promise<IDesingMicroServices.NsMicroServicesResponse> {
  const MicroServices: IDesingMicroServices.NsNodoMicroService[] = [];
  const RelNodes: IDesingMicroServices.NsThreeNodoRel[] = [];
  ObjTreeMicroServices.DeleteAllTree();

  const fire = await GenFirebaseServiceCls.GetAllFillDocuments(
    "Nodos",
    "idProject",
    "==",
    idProject
  );

  const fireRel = await GenFirebaseServiceCls.GetAllFillDocuments(
    "RelNodos",
    "idProject",
    "==",
    idProject
  );

  fire.forEach((element) => {
    const dt: IDesingMicroServices.NsNodoMicroService = {
      idProject: element?.data?.idProject,
      id: element?.id,
      idPadre: element?.data?.idPadre,
      cTipoNodo: element?.data?.cTipoNodo,
      cTitulo: element?.data?.cTitulo,
      cDescripcion: element?.data?.cDescripcion,
      cFecha: element?.data?.cFecha,
      objEstilo: {
        cColorFondo: element?.data?.objEstilo?.cColorFondo,
        cColorTexto: element?.data?.objEstilo?.cColorTexto,
        nBorderRadius: element?.data?.objEstilo?.nBorderRadius,
      },
      objProp: {
        objPosition: {
          nPointX: element?.data?.objProp?.objPosition?.nPointX,
          nPointY: element?.data?.objProp?.objPosition?.nPointY,
        },
        nAncho: element?.data?.objProp?.nAncho,
        nAlto: element?.data?.objProp?.nAlto,
        lBloqueado: element?.data?.objProp?.lBloqueado,
      },
    };
    ObjTreeMicroServices.Insert(dt);
    MicroServices.push(dt);
  });

  fireRel.forEach((item) => {
    RelNodes.push({
      idProject: idProject,
      NodoOrigen: item?.data?.NodoOrigen,
      NodoDestino: item?.data?.NodoDestino,
    });
    ObjTreeMicroServices.InsertRelaciones(
      item?.data?.NodoOrigen,
      item?.data?.NodoDestino
    );
  });

  return {
    header: {
      code: 1,
      success: 1,
      message: "string",
      errors: [],
    },
    dataMicroServices: MicroServices,
    dataRelNodes: RelNodes,
  };
}

export async function DeleteNodeFn(id: string): Promise<string> {
  const fireRel = await GenFirebaseServiceCls.GetAllFillDocuments(
    "RelNodos",
    "NodoOrigen",
    "==",
    id
  );
  // fireRel.forEach(async (e) => {
  //   await GenFirebaseServiceCls.SetDeleteDocument("RelNodos", e.id);
  // });
  
  await GenFirebaseServiceCls.SetDeleteDocument("Nodos", id);
  return Math.random().toString();
}
