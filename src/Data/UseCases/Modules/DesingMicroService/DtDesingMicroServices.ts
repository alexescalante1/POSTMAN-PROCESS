import { IDesingMicroServices } from "../../../../Domain/Interfaces";
import {
  GetMicroServicesFn,
  SetNewNodoFn,
  SetRelacNodoFn,
  SetEditNodoFn,
  GetAllRelNodesFn,
  SetPosNodoFn,
  DeleteNodeFn,
} from "./DesingMicroServices";
import {
  SetNewProjectFn,
  GetAllProjectFn,
  DeleteProjetFn,
} from "./ProjectsMicroService";

export class DtDesingMicroServicesCls implements IDesingMicroServices {
  constructor(private readonly url: string, private readonly method: string) {}

  async SetNewNodo(
    body: IDesingMicroServices.NsNodoMicroService
  ): Promise<IDesingMicroServices.NsNodoMicroService> {
    return await SetNewNodoFn(body);
  }

  async SetRelacNodo(
    body: IDesingMicroServices.NsThreeNodoRel
  ): Promise<string> {
    return await SetRelacNodoFn(body);
  }

  async SetEditNodo(
    id: string,
    body: IDesingMicroServices.NsNodoMicroService
  ): Promise<void> {
    await SetEditNodoFn(id, body);
  }

  SetPosNodo(
    cambios: any,
    body: IDesingMicroServices.NsNodoMicroService
  ): void {
    SetPosNodoFn(cambios, body);
  }

  async GetMicroServices(
    body: string
  ): Promise<IDesingMicroServices.NsMicroServicesResponse> {
    return await GetMicroServicesFn(body);
  }

  async SetNewProject(
    body: IDesingMicroServices.NsProjectMicroServ
  ): Promise<string> {
    return await SetNewProjectFn(body);
  }

  async GetAllProject(): Promise<IDesingMicroServices.NsProjectMicroServ[]> {
    return await GetAllProjectFn();
  }

  async GetAllRelNodos(): Promise<IDesingMicroServices.NsThreeNodoRel[]> {
    return await GetAllRelNodesFn();
  }

  async DeleteProject(id: string): Promise<string> {
    return await DeleteProjetFn(id);
  }

  async DeleteNode(id: string): Promise<string> {
    return await DeleteNodeFn(id);
  }
}
