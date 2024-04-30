export type MdlBaseResponse = {
  code: number;
  success: number;
  message: string;
  errors: MdlErrorResponse[];
};

export type MdlErrorResponse = {
  code: number;
  message: string;
};
