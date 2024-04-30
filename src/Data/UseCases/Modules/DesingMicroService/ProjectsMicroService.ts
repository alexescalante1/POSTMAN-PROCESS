import { IDesingMicroServices } from "../../../../Domain/Interfaces";
import { GenFirebaseServiceCls } from "../../../../Infra/Firebase";

export async function SetNewProjectFn(
  params: IDesingMicroServices.NsProjectMicroServ
): Promise<string> {
  const fire = await GenFirebaseServiceCls.SetAddDocument("Proyectos", params);
  return fire.toString();
}

export async function GetAllProjectFn(): Promise<
  IDesingMicroServices.NsProjectMicroServ[]
> {
  const result: IDesingMicroServices.NsProjectMicroServ[] = [];
  const fire = await GenFirebaseServiceCls.GetAllDocuments("Proyectos");
  fire.forEach((item) => {
    result.push({
      id: item?.id,
      nombre: item?.data?.nombre,
      descrip: item?.data?.descrip,
      fecha: item?.data?.fecha,
      editar: 0,
    });
  });
  return result;
}

export async function DeleteProjetFn(id: string): Promise<string> {
  const fireRel = await GenFirebaseServiceCls.GetAllFillDocuments(
    "RelNodos",
    "idProject",
    "==",
    id
  );
  fireRel.forEach(async (e) => {
    await GenFirebaseServiceCls.SetDeleteDocument("RelNodos", e.id);
  });

  const fireNode = await GenFirebaseServiceCls.GetAllFillDocuments(
    "Nodos",
    "idProject",
    "==",
    id
  );
  fireNode.forEach(async (e) => {
    await GenFirebaseServiceCls.SetDeleteDocument("Nodos", e.id);
  });

  await GenFirebaseServiceCls.SetDeleteDocument("Proyectos", id);
  return Math.random().toString();
}
