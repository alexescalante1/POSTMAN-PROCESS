import {
  MdlNodoMicroService,
  MdlNodoRelac,
  MdlNodoOrgDest,
} from "../../Models";

class TreeNode<T> {
  objData: MdlNodoMicroService;
  nivel: number;
  dad: TreeNode<T> | null;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  listRelations: TreeNode<T>[];
  listIndirecRel: TreeNode<T>[];
  listDependents: TreeNode<T>[];
  listDependDad: TreeNode<T>[];
  listChildrens: TreeNode<T>[];

  constructor(objData: MdlNodoMicroService) {
    this.objData = objData;
    this.nivel = 0;
    this.dad = null;
    this.left = null;
    this.right = null;
    this.listRelations = [];
    this.listIndirecRel = [];
    this.listDependents = [];
    this.listDependDad = [];
    this.listChildrens = [];
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  //===============================================
  // INSERT DATA
  //===============================================

  Insert(objData: MdlNodoMicroService): void {
    this.root = this.InsertObjData(this.root, objData);
  }

  private InsertObjData(
    node: TreeNode<T> | null,
    objData: MdlNodoMicroService
  ): TreeNode<T> {
    if (node === null) {
      return new TreeNode(objData);
    }
    if (objData.id < node.objData.id) {
      node.left = this.InsertObjData(node.left, objData);
    } else if (objData.id === node.objData.id) {
      return node;
    } else {
      node.right = this.InsertObjData(node.right, objData);
    }
    return node;
  }

  //===============================================
  // INSERT RELACIONES
  //===============================================

  InsertRelaciones(id: string, listRelations: string[]): boolean {
    let listRelaciones: TreeNode<T>[] = [];
    listRelations.forEach((element) => {
      const NodeRel: TreeNode<T> | null = this.SearchRec(this.root, element);
      if (NodeRel != null) {
        listRelaciones.push(NodeRel);
      }
    });
    return this.EditObjData(this.root, id, null, listRelaciones);
  }

  //===============================================
  // CALCULAR TODOS LOS NODOS A EXPORTAR
  //===============================================

  SetNodesByNivelAndRelation(): void {
    const resBase: TreeNode<T>[] = [];
    this.GetAllNodesByPadreRec(this.root, resBase, "0");
    resBase.forEach((e) => {
      this.SetNodesByNivelAndRelationRec(e);
    });
  }

  private SetNodesByNivelAndRelationRec(node: TreeNode<T>): void {
    this.SetNodesIsNotDad(node);
    node?.listChildrens?.forEach((e) => {
      this.SetNodesByNivelAndRelationRec(e);
    });
  }

  private SetNodesIsNotDad(node: TreeNode<T>): void {
    const AllChilldrens: TreeNode<T>[] = [];
    const AllIndirects: TreeNode<T>[] = [];
    this.GetAllNodesByPadreRec(this.root, AllChilldrens, node.objData.idPadre);
    const resExtNodes = node.listRelations.filter(
      (x) => !AllChilldrens?.some((delet) => delet.objData.id === x.objData.id)
    );

    if (resExtNodes.length > 0) {
      resExtNodes.forEach((e) => {
        const resInd = AllChilldrens.filter((x) =>
          this.GetAllDadNodes(e.objData.id)?.some(
            (y) => y.objData.id === x.objData.id
          )
        );
        if (resInd.length > 0) {
          AllIndirects.push(resInd[0]);
        } else {
          const MService: TreeNode<T>[] = [];
          this.GetAllNodesByPadreRec(this.root, MService, "0");
          const AllDadIni = MService.filter((x) =>
            this.GetAllDadNodes(node.objData.id)?.some(
              (y) => y.objData.id === x.objData.id
            )
          );
          const AllDadEnd = MService.filter((x) =>
            this.GetAllDadNodes(e.objData.id)?.some(
              (y) => y.objData.id === x.objData.id
            )
          );
          if (AllDadIni.length > 0 && AllDadEnd.length > 0) {
            if (
              // aqui el detalle para el calculo de cohesion entre MicroServicios
              !this.ValObjToList(
                AllDadIni[0].listIndirecRel,
                AllDadEnd[0].objData.id
              )
            ) {
              AllDadIni[0].listIndirecRel?.push(AllDadEnd[0]);
            }
          }
        }
      });
    }

    node.listIndirecRel = AllIndirects;
  }

  //===============================================
  // OBTENER LISTA DE MS A OBTENER
  //===============================================

  GetListGroupRelations(id: string): any[] {
    const AllChilldrens: TreeNode<T>[] = [];
    let result: any[] = [];
    this.GetAllNodesByPadreRec(this.root, AllChilldrens, "0");
    const MyMicroServ = this.GetAllDadNodes(id).filter(
      (x) => x.objData.cTipoNodo === "MicroService"
    );
    const MicroServices = AllChilldrens.filter(
      (x) =>
        !MyMicroServ.some((d) => d.objData.id === x.objData.id) &&
        x.objData.cTipoNodo === "MicroService"
    );
    MyMicroServ.forEach((e) => {
      result.push({
        key: "0",
        value: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
      });
    });
    MicroServices.forEach((e) => {
      result.push({
        key: e.objData.id,
        value: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
      });
    });
    if (MyMicroServ.length === 0) {
      result.push({
        key: "0",
        value: "ALL NODES",
      });
    }
    return result;
  }

  //===============================================
  // OBTENER NODOS FALTANTES A RELACIONAR
  //===============================================

  GetRelOutAllNode(id: string, idMs: string): TreeNode<T>[] | null {
    const res = this.SearchRec(this.root, id);
    let resNodes: TreeNode<T>[] = [];
    const MyMicroService = this.GetAllDadNodes(id).filter(
      (x) => x.objData.cTipoNodo === "MicroService"
    )[0];

    if (res) {
      if (idMs === "0") {
        resNodes = this.GetNodesInferiores(MyMicroService?.objData?.id)
          .filter(
            (objeto) =>
              !res?.listRelations.some(
                (d) => d.objData.id === objeto.objData.id
              ) &&
              !res?.listDependents.some(
                (d) => d.objData.id === objeto.objData.id
              ) &&
              !this.GetNodesInferiores(res.objData.id).some(
                (d) => d.objData.id === objeto.objData.id
              ) &&
              objeto?.objData?.id != id &&
              objeto?.objData?.id != res.objData.id &&
              objeto?.objData?.cTipoNodo != "EndPoint" &&
              objeto?.objData?.cTipoNodo != "Class" &&
              objeto?.objData?.cTipoNodo != "Capa"
          )
          .sort((a, b) => a.nivel - b.nivel);
      } else {
        resNodes = this.GetNodesInferiores(idMs)
          .filter(
            (objeto) =>
              !res?.listRelations.some(
                (delete2) => delete2.objData.id === objeto.objData.id
              ) && objeto?.objData?.cTipoNodo === "EndPoint"
          )
          .sort((a, b) => a.nivel - b.nivel);
      }
    }
    return resNodes;
  }

  //===============================================
  // OBTENER NODOS RELACIONADOS - NODO ACTUAL
  //===============================================

  GetListRelsByNode(id: string): TreeNode<T>[] {
    const res = this.SearchRec(this.root, id);
    return res != null ? res.listRelations : [];
  }

  //===============================================
  // OBTENER NODOS RELACIONADOS PARA GRAFICAR
  //===============================================

  GetRelAllNode(idPadre: string): MdlNodoOrgDest[] {
    const AllChilldrens: TreeNode<T>[] = [];
    const result: MdlNodoOrgDest[] = [];
    this.GetAllNodesByPadreRec(this.root, AllChilldrens, idPadre);
    AllChilldrens.forEach((node) => {
      result.push(this.GetRelNode(node, AllChilldrens));
    });
    return result;
  }

  GetRelNode(node: TreeNode<T>, AllChilldrens: TreeNode<T>[]): MdlNodoOrgDest {
    return {
      NodoOrigen: this.FormatRelNodes(node),
      NodoDestino: this.GetListRelNodes(node, AllChilldrens),
    };
  }

  GetListRelNodes(
    node: TreeNode<T>,
    AllChilldrens: TreeNode<T>[]
  ): MdlNodoRelac[] {
    const listRelac: MdlNodoRelac[] = [];
    [
      ...node.listRelations.filter((x) =>
        AllChilldrens?.some((delet) => delet.objData.id === x.objData.id)
      ),
      ...node.listIndirecRel,
    ].forEach((e) => {
      listRelac.push(this.FormatRelNodes(e));
    });
    return listRelac;
  }

  FormatRelNodes(nodeAct: TreeNode<T>): MdlNodoRelac {
    return {
      id: nodeAct.objData.id,
      cTitulo: nodeAct.objData.cTitulo,
      objProp: {
        objPosition: nodeAct.objData.objProp.objPosition,
        nAncho: nodeAct.objData.objProp.nAncho,
        nAlto: nodeAct.objData.objProp.nAlto,
        lBloqueado: nodeAct.objData.objProp.lBloqueado,
      },
    };
  }

  //===============================================
  // CALCULAR COHESION
  //===============================================

  CohesionByMicroService(id: string): any[] {
    let ListClassCohesion: any[] = [];
    this.GetNodesInferiores(id)
      .filter((x) => x.objData.cTipoNodo === "Class")
      .forEach((e) => {
        ListClassCohesion.push({
          className: e.objData.cTitulo,
          classData: this.CohesionByDad(e.objData.id),
        });
      });
    return ListClassCohesion;
  }

  contarRepetidos(atributo: string[]) {
    const frecuencias = new Map();
    atributo.forEach((e) => {
      frecuencias.set(e, (frecuencias.get(e) || 0) + 1);
    });
    return frecuencias;
  }

  CohesionByDad(id: string): any {
    const AllChilldrens: TreeNode<T>[] = [];
    let listGroups: any[] = [];
    let listMeth: any[] = [];
    let listSubT: any[] = [];
    let listWgrp: any[] = [];
    let listSmth: any[] = [];
    let listAtri: any[] = [];
    let W: number = 0,
      TM: number = 0;
    this.GetAllNodesByPadreRec(this.root, AllChilldrens, id);

    //======================================================================
    // COHESION DE OBJETOS
    //======================================================================

    const Methods = AllChilldrens.filter((x) => x.listRelations.length > 0);
    if (Methods.length > 0) {
      Methods.forEach((e) => {
        e.listRelations.forEach((rel) => {
          rel.listDependDad = [];
        });
      });

      Methods.forEach((e) => {
        //OBTIENE LOS NODOS DEPENDIENTES A ESTE
        e.listRelations.forEach((rel) => {
          if (!this.ValObjToList(rel.listDependDad, e.objData.id)) {
            rel.listDependDad?.push(e);
          }
          if (!this.ValObjToList(listGroups, rel.objData.id)) {
            listGroups.push(rel);
          }
          W = W < rel.listDependDad.length ? rel.listDependDad.length : W;

          listAtri.push(rel.objData.cTitulo);
        });
      });

      Methods.forEach((e) => {
        listMeth.push({
          MO: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
          RM: e.listRelations.length / listGroups.length,
          fx:
            "R (" +
            e.objData.cTitulo +
            ") " +
            e.listRelations.length +
            "/" +
            listGroups.length +
            " = " +
            e.listRelations.length / Methods.length,
        });

        const MaxSMinTree = e.listRelations.reduce(
          (acumulador, objeto) => acumulador + objeto.listDependDad.length / W,
          0
        );

        TM = TM < MaxSMinTree ? MaxSMinTree : TM;
      });

      this.contarRepetidos(listAtri).forEach((cantidad, nombre) => {
        console.log("WG: ", nombre, "=", cantidad / W);

        listWgrp.push({
          fx: "WG (" + nombre + ") => " + cantidad / W,
        });
      });

      Methods.forEach((e) => {
        const MaxSMinTree = e.listRelations.reduce(
          (acumulador, objeto) => acumulador + objeto.listDependDad.length / W,
          0
        );

        let res: string = "";
        e.listRelations.forEach((element) => {
          res += ` ${element.listDependDad.length / W} +`;
        });

        console.log(
          "S: ",
          e.objData.cTitulo,
          res.substring(0, res.length - 1),
          " = ",
          MaxSMinTree
        );

        listSmth.push({
          fx:
            "S (" +
            e.objData.cTitulo +
            ") => " +
            res.substring(0, res.length - 1) +
            " = " +
            MaxSMinTree,
        });

        listSubT.push({
          M: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
          WG: MaxSMinTree / TM,
          fx:
            "R (" +
            e.objData.cTitulo +
            " ) => " +
            MaxSMinTree +
            " / " +
            TM +
            " = " +
            MaxSMinTree / TM,
        });

        TM = TM < MaxSMinTree ? MaxSMinTree : TM;
      });

      listSubT.forEach((e) => {
        console.log(e.fx);
      });

      const CohesionQueue =
        listMeth.reduce((acumulador, objeto) => acumulador + objeto.RM, 0) /
        listMeth.length;

      const CohesionClass =
        listSubT.reduce((acumulador, objeto) => acumulador + objeto.WG, 0) /
        listSubT.length;

      console.log(
        "Cohesion (Class Queue) = (" +
          listSubT.map((o) => o.WG).join(" + ") +
          ") / " +
          listSubT.length
      );

      console.log(
        "Cohesion (Class Queue) = " + Math.round(CohesionClass * 1000) / 1000
      );

      console.log("totalNumberOfPublicMethodsInSubsetTree: ", W);
      console.log("TM: ", listSubT.length);

      return {
        totalNumberOfPublicMethodsInSubsetTree: W,
        TM: listSubT.length,
        CohesionQueue: Math.round(CohesionQueue * 1000) / 1000,
        CohesionClass: Math.round(CohesionClass * 1000) / 1000,
        fxCohesionQueue: [
          ...listMeth.map((o) => o.fx),
          "Cohesion (Queue) = (" +
            listMeth.map((o) => o.RM).join(" + ") +
            ") / " +
            listMeth.length,
          "Cohesion (Queue) = " + CohesionQueue,
        ],
        fxCohesionClass: [
          ...listSubT.map((o) => o.fx),
          "Cohesion (Class Queue) = (" +
            listSubT.map((o) => o.WG).join(" + ") +
            ") / " +
            listSubT.length,
        ],
        fxWg: [...listWgrp.map((o) => o.fx)],
        fxSM: [...listSmth.map((o) => o.fx)],
      };
    }

    //======================================================================
    // COHESION DE OBJETOS
    //======================================================================

    const Microserv = AllChilldrens.filter((x) => x.listIndirecRel.length > 0);
    if (Microserv.length > 0) {
      Microserv.forEach((e) => {
        e.listIndirecRel.forEach((rel) => {
          rel.listDependDad = [];
        });
      });

      Microserv.forEach((e) => {
        //OBTIENE LOS NODOS DEPENDIENTES A ESTE
        e.listIndirecRel.forEach((rel) => {
          if (!this.ValObjToList(rel.listDependDad, e.objData.id)) {
            rel.listDependDad?.push(e);
          }
          W = W < rel.listDependDad.length ? rel.listDependDad.length : W;
        });
      });

      Microserv.forEach((e) => {
        listMeth.push({
          MO: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
          RM: e.listIndirecRel.length / Microserv.length,
          fx:
            "R (" +
            e.objData.cTitulo +
            ") " +
            e.listIndirecRel.length +
            "/" +
            Microserv.length +
            " = " +
            e.listIndirecRel.length / Microserv.length,
        });

        const MaxSMinTree = e.listIndirecRel.reduce(
          (acumulador, objeto) => acumulador + objeto.listDependDad.length / W,
          0
        );

        TM = TM < MaxSMinTree ? MaxSMinTree : TM;
      });

      Microserv.forEach((e) => {
        const MaxSMinTree = e.listIndirecRel.reduce(
          (acumulador, objeto) => acumulador + objeto.listDependDad.length / W,
          0
        );

        listSubT.push({
          M: e.objData.cTipoNodo + " - " + e.objData.cTitulo,
          WG: MaxSMinTree / TM,
          fx:
            "S (" +
            e.objData.cTitulo +
            " ) => " +
            MaxSMinTree +
            " / " +
            TM +
            " = " +
            MaxSMinTree / TM,
        });

        TM = TM < MaxSMinTree ? MaxSMinTree : TM;
      });

      const CohesionQueue =
        listMeth.reduce((acumulador, objeto) => acumulador + objeto.RM, 0) /
        listMeth.length;

      const CohesionClass =
        listSubT.reduce((acumulador, objeto) => acumulador + objeto.WG, 0) /
        listSubT.length;

      return {
        CohesionQueue: CohesionQueue,
        CohesionClass: CohesionClass,
        fxCohesionQueue: [
          ...listMeth.map((o) => o.fx),
          "Cohesion (Queue) = (" +
            listMeth.map((o) => o.RM).join(" + ") +
            " ) / " +
            listMeth.length,
          "Cohesion (Queue) = " + CohesionQueue,
        ],
        fxCohesionClass: [
          ...listSubT.map((o) => o.fx),
          "Cohesion (Class Queue) = (" +
            listSubT.map((o) => o.WG).join(" + ") +
            " ) / " +
            listSubT.length,
          "Cohesion (Class Queue) = " + CohesionClass,
        ],
      };
    }

    return {
      CohesionQueue: 0,
      CohesionClass: 1,
      fxCohesionQueue: [],
      fxCohesionClass: [],
    };
  }

  //===============================================
  // CALCULAR NODOS POR NIVEL
  //===============================================

  SetNodesByNivel(): void {
    const resBase: TreeNode<T>[] = [];
    this.GetAllNodesByPadreRec(this.root, resBase, "0");
    resBase.forEach((e) => {
      this.GetNodesByNivelObjData(e, 0);
    });
  }

  private GetNodesByNivelObjData(
    node: TreeNode<T> | null,
    nivel: number
  ): void {
    if (node === null) {
      return;
    }
    node.nivel = nivel;
    node?.listChildrens?.forEach((e) => {
      this.GetNodesByNivelObjData(e, nivel + 1);
    });
  }

  //===============================================
  // OBTENER NODOS INFERIORES
  //===============================================

  GetNodesInferiores(id: string): TreeNode<T>[] {
    const resBase: TreeNode<T>[] = [];
    const resInfNodes: TreeNode<T>[] = [];
    this.GetAllNodesByPadreRec(this.root, resBase, id);
    resBase.forEach((e) => {
      this.GetNodesInferioresRec(e, resInfNodes);
    });
    return resInfNodes;
  }

  private GetNodesInferioresRec(
    node: TreeNode<T> | null,
    resInfNodes: TreeNode<T>[]
  ): void {
    if (node === null) {
      return;
    }
    resInfNodes.push(node);
    node?.listChildrens?.forEach((e) => {
      this.GetNodesInferioresRec(e, resInfNodes);
    });
  }

  //===============================================
  // OBTENER TODOS LOS PADRES DEL NODO
  //===============================================

  GetAllDadNodes(id: string): TreeNode<T>[] {
    const resDadNodes: TreeNode<T>[] = [];
    const Nodo = this.SearchRec(this.root, id);
    if (Nodo != null) {
      this.GetAllDadNodesRec(Nodo?.dad, resDadNodes);
    }
    return resDadNodes;
  }

  private GetAllDadNodesRec(
    node: TreeNode<T> | null,
    resInfNodes: TreeNode<T>[]
  ): void {
    if (node === null) {
      return;
    }
    resInfNodes.push(node);
    this.GetAllDadNodesRec(node.dad, resInfNodes);
  }

  //===============================================
  // PROCESAR DEPENDENCIAS INVERSAS
  //===============================================

  SetDependents(): void {
    let allNodes: TreeNode<T>[] = [];
    this.GetAllNodesRec(this.root, allNodes);
    allNodes.forEach((node) => {
      node.listRelations.forEach((chilldren) => {
        if (!this.ValObjToList(chilldren.listDependents, node.objData.id)) {
          chilldren.listDependents?.push(node);
        }
      });
    });
  }

  //===============================================
  // PROCESAR PADRES E HIJOS
  //===============================================

  SetObjDadChilldren(): void {
    let allNodes: TreeNode<T>[] = [];
    this.GetAllNodesRec(this.root, allNodes);
    allNodes.forEach((hijo) => {
      const dad = allNodes.filter(
        (x) => x?.objData?.id == hijo?.objData?.idPadre
      )[0];
      if (dad != null) {
        hijo.dad = dad;
        if (!this.ValObjToList(dad.listChildrens, hijo?.objData?.id)) {
          dad.listChildrens?.push(hijo);
        }
      }
    });
  }

  ValObjToList(lista: TreeNode<T>[], id: string) {
    return lista.some((item) => item?.objData?.id === id);
  }

  //===============================================
  // OBTENER TODOS LOS NODOS DEL PADRE - OPTIMIZADO
  //===============================================

  ObtenerNodosByPadre(id: string): MdlNodoMicroService[] {
    let AllChilldrens: MdlNodoMicroService[] = [];
    if (id === "0") {
      const res: TreeNode<T>[] = [];
      this.GetAllNodesByPadreRec(this.root, res, id);
      res?.forEach((e) => {
        AllChilldrens.push(e.objData);
      });
    } else {
      this.SearchRec(this.root, id)?.listChildrens?.forEach((e) => {
        AllChilldrens.push(e.objData);
      });
    }
    return AllChilldrens;
  }

  //===============================================
  // OBTENER TODOS LOS NODOS DEL PADRE
  //===============================================

  GetAllNodesByPadre(idPadre: string): MdlNodoMicroService[] {
    const res: TreeNode<T>[] = [];
    this.GetAllNodesByPadreRec(this.root, res, idPadre);
    return res.map((objeto) => objeto.objData);
  }

  private GetAllNodesByPadreRec(
    node: TreeNode<T> | null,
    result: TreeNode<T>[],
    idPadre: string
  ): void {
    if (node === null) {
      return;
    }
    this.GetAllNodesByPadreRec(node.left, result, idPadre);
    if (idPadre === node?.objData?.idPadre) {
      result.push(node);
    }
    this.GetAllNodesByPadreRec(node.right, result, idPadre);
  }

  //===============================================
  // OBTENER TODOS LOS NODOS
  //===============================================

  GetAllNodes(): MdlNodoMicroService[] {
    const res: TreeNode<T>[] = [];
    this.GetAllNodesRec(this.root, res);
    return res.map((obj) => obj.objData);
  }

  private GetAllNodesRec(node: TreeNode<T> | null, res: TreeNode<T>[]): void {
    if (node === null) {
      return;
    }
    this.GetAllNodesRec(node.left, res);
    res.push(node);
    this.GetAllNodesRec(node.right, res);
  }

  //===============================================
  // BUSCAR NODO POR ID
  //===============================================

  Search(id: string): MdlNodoMicroService | null {
    return this.SearchRec(this.root, id)?.objData ?? null;
  }

  SearchTree(id: string): TreeNode<T> | null {
    return this.SearchRec(this.root, id) ?? null;
  }

  private SearchRec(node: TreeNode<T> | null, id: string): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (node.objData.id === id) {
      return node;
    }

    if (id < node.objData.id) {
      return this.SearchRec(node.left, id);
    } else {
      return this.SearchRec(node.right, id);
    }
  }

  //===============================================
  // BUSCAR NODOS POR TIPO
  //===============================================

  SearchNodesByTipo(tipo: string): TreeNode<T>[] {
    const res: TreeNode<T>[] = [];
    this.SearchNodesByTipoRec(this.root, res, tipo);
    return res;
  }

  private SearchNodesByTipoRec(
    node: TreeNode<T> | null,
    res: TreeNode<T>[],
    tipo: string
  ): void {
    if (node === null) {
      return;
    }
    this.SearchNodesByTipoRec(node.left, res, tipo);
    if (node?.objData?.cTipoNodo === tipo) {
      res.push(node);
    }
    this.SearchNodesByTipoRec(node.right, res, tipo);
  }

  //===============================================
  // EDITAR NODO
  //===============================================

  Edit(
    id: string,
    objData: MdlNodoMicroService | null,
    lisNodesRel: TreeNode<T>[] | null
  ): boolean {
    return this.EditObjData(this.root, id, objData, lisNodesRel);
  }

  private EditObjData(
    node: TreeNode<T> | null,
    id: string,
    objData: MdlNodoMicroService | null,
    lisNodesRel: TreeNode<T>[] | null
  ): boolean {
    if (node === null) {
      return false;
    }

    if (node.objData.id === id) {
      if (objData != null) {
        node.objData = objData;
      }
      if (lisNodesRel != null) {
        node.listRelations = lisNodesRel;
      }
      return true;
    }

    if (id < node.objData.id) {
      return this.EditObjData(node.left, id, objData, lisNodesRel);
    } else {
      return this.EditObjData(node.right, id, objData, lisNodesRel);
    }
  }

  //===============================================
  // ELIMINAR LOS NODOS
  //===============================================

  DeleteAllTree(): void {
    this.root = null;
  }

  DeleteNode(id: string): void {
    const res: TreeNode<T>[] = [];
    const NodeDelete = this.SearchRec(this.root, id);
    this.GetAllNodesRec(this.root, res);
    res.forEach(async (e) => {
      e.listRelations = e.listRelations.filter(
        (Node) => Node.objData.id != NodeDelete?.objData.id
      );
      e.listDependents = e.listDependents.filter(
        (Node) => Node.objData.id != NodeDelete?.objData.id
      );
      e.listIndirecRel = e.listIndirecRel.filter(
        (Node) => Node.objData.id != NodeDelete?.objData.id
      );
      e.listChildrens = e.listChildrens.filter(
        (Node) => Node.objData.id != NodeDelete?.objData.id
      );
    });

    this.root = this.DeleteNodeRec(this.root, id);
  }

  DeleteNodeRec<T>(root: TreeNode<T> | null, id: string): TreeNode<T> | null {
    if (root === null) {
      return null;
    }

    if (id < root.objData.id) {
      root.left = this.DeleteNodeRec(root.left, id);
    } else if (id > root.objData.id) {
      root.right = this.DeleteNodeRec(root.right, id);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      let successor = this.FindMin(root.right);
      root.objData = successor.objData;
      root.right = this.DeleteNodeRec(root.right, successor.objData.id);
    }
    return root;
  }

  FindMin<T>(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
}

export const ObjTreeMicroServices = new BinaryTree();
