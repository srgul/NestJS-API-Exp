import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseType } from '../../../helper/response-type/response-type';
import { IUser } from './user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserControllerInterface {
  Create(createUserDto: CreateUserDto): Promise<ResponseType<boolean>>;
  GetAllUsers(): Promise<ResponseType<IUser[]>>;
  GetUser(id: string): Promise<ResponseType<IUser>>;
  UpdateUser(
    id: string,
    updateCreateUserDto: UpdateUserDto,
  ): Promise<ResponseType<boolean>>;
  Delete(id: string): Promise<ResponseType<boolean>>;
}
