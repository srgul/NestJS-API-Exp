import { IResponseType } from './interface/response-type.interface';

export class ResponseType<T> implements IResponseType<T> {
  data?: T;
  err?: any;
  errMessage?: string;
  status: boolean;
  statusCode?: number;
}
