import { FragmentData } from "../../Main/Utilities/FragmentStorage/FragmentData";

export function GetToken() {
  var tkn: string = "";
  const tokenLocalStorage = new FragmentData("MyKingAlex").GtParttnDtLS(
    "EA2S2DFTYUCF5VR67TU2A5E8Y5FDD1",
    "Tulg"
  );

  if (tokenLocalStorage) {
    tkn = JSON.parse(tokenLocalStorage)?.Tk;
  }

  const headers = {
    Authorization: "Bearer " + tkn,
  };
  return headers;
}
