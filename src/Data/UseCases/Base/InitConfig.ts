import { AxiosHttpClientCls, AlertServerErrorCls } from "../../../Infra/Http";
import { Alertas } from "../../../presentation/GenComponents";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";
import { GetToken } from "../../Utitilies";

export class GetInitConfigCls {
  constructor(
    private readonly url: string,
    private readonly method: string,
    private readonly url2: string,
    private readonly method2: string
  ) {}

  private DBEndPoints = [
    {
      idMenu: "",
      idEndpoint: "20000",
      cEndpoint: "default",
      cPath: "",
      cMethod: "GET",
      cRoute: "",
      dFechaModificacion: "05/11/2022",
    },
  ];
  private DBRoutes = [
    {
      myRoute: "/",
      nameRoute: "Inicio",
    },
  ];

  async GetInitConfig(): Promise<boolean> {
    console.log(this.url);
    console.log(this.method);
    console.log(this.url2);
    console.log(this.method2);

    let DBDataMenu = await this.FormatOuto(GetToken());

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
        "Mnlg",
        JSON.stringify(DBDataMenu)
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
        "EPlg",
        JSON.stringify(this.DBEndPoints)
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    if (
      !new FragmentData("MyKingAlex").StParttnDtLS(
        "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
        "Rtlg",
        JSON.stringify(this.DBRoutes)
      )
    ) {
      Alertas("error", "Error en almacenamiento.");
    }

    console.log(this.DBRoutes);
    console.log(this.DBEndPoints);

    return true;
  }

  async FormatOuto(headers: any): Promise<any> {
    let DBMenuList;

    const httpResponseMenu = await new AxiosHttpClientCls().QueryRequest({
      url: this.url,
      method: this.method,
      headers: headers,
    });

    let ObjData = httpResponseMenu?.body?.data;
    new AlertServerErrorCls().AlertStatusCode(httpResponseMenu.statusCode);

    if (httpResponseMenu?.body?.success === 1) {
      DBMenuList = await this.FormatListMenuNavbar(headers, ObjData);
    }

    return DBMenuList;
  }

  async FormatListMenuNavbar(headers: any, ObjData: any): Promise<any> {
    let DBMenuList = [];
    let ListRoutes = [];

    if (ObjData) {
      for (let i = 0; i < ObjData.length; i++) {
        const httpResponseMenuAside = await new AxiosHttpClientCls().QueryRequest({
          url: this.url2 + ObjData[i]?.idApp,
          method: this.method2,
          headers: headers,
        });

        let ObjDataMenuAside = httpResponseMenuAside?.body?.data;
        new AlertServerErrorCls().AlertStatusCode(
          httpResponseMenuAside.statusCode
        );

        let DBMenuListAside = [];

        if (httpResponseMenuAside?.body?.success == 1) {
          DBMenuListAside = await this.FormatListMenuAside(ObjDataMenuAside);
        }

        DBMenuList.push({
          idApp: ObjData[i]?.idApp,
          name: ObjData[i]?.cAppNombre,
          nameMenu: ObjData[i]?.cContexto.replace("/api/", ""),
          cUrl: ObjData[i]?.cContexto,
          cDescripcion: ObjData[i]?.cDescripcion,
          dataMenu: DBMenuListAside,
        });

        ListRoutes.push({
          myRoute: ObjData[i]?.cContexto.replace("/api", ""),
          nameRoute: ObjData[i]?.cAppNombre,
        });
      }
    }

    this.DBRoutes = this.DBRoutes.concat(ListRoutes);

    return DBMenuList;
  }

  async FormatListMenuAside(ObjDataMenuList: any): Promise<any> {
    let DBMenuListAside = [];
    let ListRoutes = [];
    let DBSubData;
    let DBEndPoints;

    if (ObjDataMenuList) {
      for (let i = 0; i < ObjDataMenuList.length; i++) {
        let SubMenus = ObjDataMenuList[i]?.submenus;
        if (SubMenus) {
          if (SubMenus.length > 0) {
            DBSubData = await this.FormatListMenuAside(SubMenus);
          }
        }

        let EndPoints = ObjDataMenuList[i]?.endpoints;
        if (EndPoints) {
          if (EndPoints.length > 0) {
            DBEndPoints = await this.AddEndPoints(EndPoints);
          }
        }

        if (ObjDataMenuList[i]?.cRoute) {
          ListRoutes.push({
            myRoute: ObjDataMenuList[i]?.cRoute.replace("/api", ""),
            nameRoute: ObjDataMenuList[i]?.cMenu,
          });
        }

        DBMenuListAside.push({
          id: ObjDataMenuList[i]?.idMenu,
          type: ObjDataMenuList[i]?.cTipo,
          name: ObjDataMenuList[i]?.cMenu,
          icon: ObjDataMenuList[i]?.cIcono,
          url: ObjDataMenuList[i]?.cRoute,
          nameSpan: "",
          iconSpan: "",
          active: false,
          data: DBSubData,
          endpoints: DBEndPoints,
        });
      }
    }

    this.DBRoutes = this.DBRoutes.concat(ListRoutes);

    return DBMenuListAside;
  }

  async AddEndPoints(ObjDataEndPoints: any): Promise<any> {
    let ListEndPoints = [];

    if (ObjDataEndPoints) {
      for (let i = 0; i < ObjDataEndPoints.length; i++) {
        ListEndPoints.push({
          idMenu: ObjDataEndPoints[i]?.idMenu,
          idEndpoint: ObjDataEndPoints[i]?.idEndpoint,
          cEndpoint: ObjDataEndPoints[i]?.cEndpoint,
          cPath: ObjDataEndPoints[i]?.cPath,
          cMethod: ObjDataEndPoints[i]?.cVerbo,
          cRoute: ObjDataEndPoints[i]?.cRoute,
          dFechaModificacion: ObjDataEndPoints[i]?.dFechaModificacion,
        });
      }
    }

    this.DBEndPoints = this.DBEndPoints.concat(ListEndPoints);
    return ListEndPoints;
  }
}
