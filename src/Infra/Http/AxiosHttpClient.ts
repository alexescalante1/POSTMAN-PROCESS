import { IHttpClient } from "../../Domain/Interfaces/Protocols";
import axios, { AxiosResponse } from "axios";
import { RutaServer } from "../../Main/Config/GlobalConfig";

export class AxiosHttpClientCls implements IHttpClient {
  async QueryRequest(
    data: IHttpClient.NsHttpRequest
  ): Promise<IHttpClient.NsHttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: RutaServer + data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: any) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
