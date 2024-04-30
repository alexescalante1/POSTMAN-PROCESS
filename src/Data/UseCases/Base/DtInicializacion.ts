import { IInicializacion } from "../../../Domain/Interfaces";
import { GetLoginAuthFn } from "./LoginAuth";
import { GetInitConfigCls } from "./InitConfig";

export class DtInicializacionCls implements IInicializacion {
  constructor(private readonly url: string, private readonly method: string) {}

  async GetLoginAuth(
    body: IInicializacion.NsLoginAuthRequest
  ): Promise<IInicializacion.NsLoginAuthResponse> {
    return await GetLoginAuthFn(this.url, this.method, body);
  }

  async GetInitConfig(url2: string, method2: string): Promise<boolean> {
    const InitConfig = await new GetInitConfigCls(
      this.url,
      this.method,
      url2,
      method2
    ).GetInitConfig();
    return InitConfig;
  }
}
