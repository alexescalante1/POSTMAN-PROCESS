export interface IDocumentData {
  id: string;
  data: any; // Define la estructura de tus datos
}

export interface IFirebaseService {
  GetDocumentById: (
    collection: string,
    id: string
  ) => Promise<IDocumentData | null>;
  GetAllDocuments: (collection: string) => Promise<IDocumentData[]>;
  GetAllFillDocuments: (
    collection: string,
    fieldPath: string,
    opStr: any,
    value: any
  ) => Promise<IDocumentData[]>;
  SetAddDocument: (collection: string, data: any) => Promise<string>;
  SetUpdateDocument: (
    collection: string,
    id: string,
    data: any
  ) => Promise<void>;
  SetDeleteDocument: (collection: string, id: string) => Promise<void>;
}
