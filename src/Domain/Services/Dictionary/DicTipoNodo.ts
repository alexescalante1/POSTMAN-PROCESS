import { Dictionary } from "./Dictionary";

export const ListTipoNodo = new Dictionary<any>();
ListTipoNodo.insertOrUpdate("1", { key: "Node", value: "NODO" });
ListTipoNodo.insertOrUpdate("2", { key: "Capa", value: "CAPA" });
ListTipoNodo.insertOrUpdate("3", {
  key: "MicroService",
  value: "MICRO SERVICES",
});
ListTipoNodo.insertOrUpdate("4", { key: "EndPoint", value: "END POINT" });
ListTipoNodo.insertOrUpdate("5", { key: "Class", value: "CLASS" });
ListTipoNodo.insertOrUpdate("6", { key: "Method", value: "METHOD" });
ListTipoNodo.insertOrUpdate("7", { key: "Attribute", value: "ATTRIBUTE" });
ListTipoNodo.insertOrUpdate("8", { key: "QueryDB", value: "QUERY DB" });
ListTipoNodo.insertOrUpdate("9", { key: "DataBase", value: "DATA BASE" });
ListTipoNodo.insertOrUpdate("10", {
  key: "DB-Procedure",
  value: "DB PROCEDURES",
});
ListTipoNodo.insertOrUpdate("11", { key: "DB-Function", value: "DB FUNCTION" });
ListTipoNodo.insertOrUpdate("12", { key: "DB-Table", value: "DB TABLE" });
ListTipoNodo.insertOrUpdate("13", { key: "DB-Values", value: "DB VALUES" });
ListTipoNodo.insertOrUpdate("14", { key: "API-Request", value: "API REQUEST" });

export function GetTipoNodoFn(nivel: number) {
  let listTipos: any[] = [];
  let selectTipo: string = "";
  switch (nivel) {
    case 0:
      ["1", "3"].forEach((e) => {
        listTipos.push(ListTipoNodo.get(e));
      });
      selectTipo = ListTipoNodo.get("3").key;
      break;
    case 1:
      ["1", "2"].forEach((e) => {
        listTipos.push(ListTipoNodo.get(e));
      });
      selectTipo = ListTipoNodo.get("2").key;
      break;
    case 2:
      ["1", "4", "5", "6", "7", "14"].forEach((e) => {
        listTipos.push(ListTipoNodo.get(e));
        selectTipo = ListTipoNodo.get("5").key;
      });
      break;
    default:
      ["1", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"].forEach(
        (e) => {
          listTipos.push(ListTipoNodo.get(e));
        }
      );
      selectTipo = ListTipoNodo.get("6").key;
      break;
  }
  return { select: selectTipo, ListData: listTipos };
}

export function GetColorNodoFn(tipo: string): any {
  switch (tipo) {
    case "Node":
      return {
        colorText: "#ffffff",
        colorFondo: "#FF0000",
      };
    case "Capa":
      return {
        colorText: "#ffffff",
        colorFondo: "#7000FF",
      };
    case "MicroService":
      return {
        colorText: "#ffffff",
        colorFondo: "#003EFF",
      };
    case "EndPoint":
      return {
        colorText: "#ffffff",
        colorFondo: "#0B9700",
      };
    case "Class":
      return {
        colorText: "#ffffff",
        colorFondo: "#ff0000",
      };
    case "Method":
      return {
        colorText: "#ffffff",
        colorFondo: "#004E97",
      };
    case "Attribute":
      return {
        colorText: "#ffffff",
        colorFondo: "#7E0097",
      };
    case "QueryDB":
      return {
        colorText: "#ffffff",
        colorFondo: "#24886B",
      };
    case "DataBase":
      return {
        colorText: "#ffffff",
        colorFondo: "#9A9E13",
      };
    case "API-Request":
      return {
        colorText: "#ffffff",
        colorFondo: "#A2388D",
      };
    default:
      return {
        colorText: "#ffffff",
        colorFondo: "#03192F",
      };
  }
}
