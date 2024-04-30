//===================================================
// REF: https://www.npmjs.com/package/crypto-js
//===================================================

export class C1p70 {
  private CryptoJS: any = require("crypto-js");
  private keyONE162892 = this.CryptoJS.enc.Hex.parse(
    "000102030405060708090a0b0c0d0e1f"
  );
  private iv = this.CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
  private C4ss1628989: string;

  constructor(dtK: string) {
    this.C4ss1628989 = dtK;
  }

  C1pt0 = (dt: string): string => {
    try {
      if (this.C4ss1628989 === "MyKingAlex") {
        return this.CryptoJS.AES.encrypt(dt, this.keyONE162892, {
          iv: this.iv,
        });
      } else {
        return "Err";
      }
    } catch (e: any) {
      localStorage.clear();
      window.location.reload();
      return "Err";
    }
  };

  DC1pt0 = (dt: string): string => {
    try {
      if (this.C4ss1628989 === "MyKingAlex") {
        var bytes = this.CryptoJS.AES.decrypt(dt, this.keyONE162892, {
          iv: this.iv,
        });
        var decryptedData = bytes?.toString(this.CryptoJS?.enc?.Utf8);
        return decryptedData;
      } else {
        return "Err";
      }
    } catch (e: any) {
      localStorage.clear();
      window.location.reload();
      return "Err";
    }
  };
}
