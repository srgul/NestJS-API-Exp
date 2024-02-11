export interface IResponseType<T> {
  data?: T;
  statusCode?: number;
  status: boolean;
  errMessage?: string;
  err?: any;
}
