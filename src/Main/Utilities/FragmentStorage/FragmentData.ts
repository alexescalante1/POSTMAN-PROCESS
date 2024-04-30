//import { number } from "prop-types";
import { C1p70 } from "../Crypto/DecEncrypt";
import { LocalStorageAdapterCls } from "../../../Infra/Cache";

export class FragmentData {
  private C4ss1628989: string;
  private Vrbls: string[] = [];
  private Dtbls: string[] = [];
  private CfiBs: string[] = [];

  constructor(dtK: string) {
    this.C4ss1628989 = dtK;
  }

  DtVarFragment = (mky: string, idPtc: string): void => {
    let Token = new C1p70(this.C4ss1628989).C1pt0(mky)?.toString();
    let DvcVar: number = Math.round(
      (Token.length + 1) / Math.round(mky.length / 8)
    );
    for (let i = 0, j = DvcVar; i < Token.length; i += DvcVar, j += DvcVar) {
      this.Vrbls.push(Token.substring(i, j) + idPtc);
    }
  };

  DtDatFragment = (dt: string): void => {
    let Data = new C1p70(this.C4ss1628989).C1pt0(dt)?.toString();
    let DvcDat: number = Math.round(
      (Data.length + 10) / Math.round(this.Vrbls.length)
    );
    for (let i = 0, j = DvcDat; i < Data.length; i += DvcDat, j += DvcDat) {
      this.Dtbls.push(Data.substring(i, j));
    }
  };

  StParttnDtLS = (mky: string, idPtc: string, dt: string): boolean => {
    try {
      if (this.C4ss1628989 === "MyKingAlex") {
        this.DtVarFragment(mky, idPtc);
        this.DtDatFragment(dt);
        for (let i = 0; i < this.Vrbls.length; i++) {
          new LocalStorageAdapterCls().SetStorage(this.Vrbls[i], {
            Value: this.Dtbls[i],
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      localStorage.clear();
      window.location.reload();
      return false;
    }
  };

  GtParttnDtLS = (mky: string, idPtc: string): string => {
    try {
      if (this.C4ss1628989 === "MyKingAlex") {
        let DtEncrypt: string = "";
        this.DtVarFragment(mky, idPtc);
        for (let i = 0; i < this.Vrbls.length; i++) {
          DtEncrypt += new LocalStorageAdapterCls()
            .GetStorage(this.Vrbls[i])
            ?.Value?.toString();
        }
        return new C1p70(this.C4ss1628989).DC1pt0(DtEncrypt)?.toString();
      } else {
        return "Err";
      }
    } catch (e: any) {
      localStorage.clear();
      window.location.reload();
      return "Err";
    }
  };

  DlParttnDtLS = (mky: string, idPtc: string): string => {
    if (this.C4ss1628989 === "MyKingAlex") {
      let DtEncrypt: string = "";
      this.DtVarFragment(mky, idPtc);
      for (let i = 0; i < this.Vrbls.length; i++) {
        new LocalStorageAdapterCls().SetStorage(this.Vrbls[i], {
          Value: "",
        });
      }
      return "Ok";
    } else {
      return "Err";
    }
  };
}
