import { ResponseType } from '../../../helper/response-type/response-type';
import { IFormation } from './formation.interface';
import { CreateFormationDto } from '../dto/create-formation.dto';
import { UpdateFormationDto } from '../dto/update-formation.dto';

export interface IFormationController {
  Create(
    createFormationDto: CreateFormationDto,
  ): Promise<ResponseType<boolean>>;
  FindAll(): Promise<ResponseType<IFormation[]>>;
  FindOne(id: string): Promise<ResponseType<UpdateFormationDto>>;
  Update(
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Promise<ResponseType<boolean>>;
  Delete(id: string): Promise<ResponseType<boolean>>;
  AddMultiFormation(
    createFormationDto: CreateFormationDto[],
  ): Promise<ResponseType<boolean>>;
}
