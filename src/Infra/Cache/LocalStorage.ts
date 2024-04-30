import {
  ISetStorage,
  IGetStorage,
} from "../../Domain/Interfaces/Protocols";

export class LocalStorageAdapterCls implements ISetStorage, IGetStorage {
  SetStorage(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  GetStorage(key: string): any {
    const DATA: any = localStorage.getItem(key);
    return JSON.parse(DATA);
  }
}
