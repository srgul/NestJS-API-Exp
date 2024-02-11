import { Gender } from '../interfaces/user.interface';

export class CreateUserDto {
  age: number;
  birthday: string;
  email: string;
  gender: Gender;
  name: string;
  surname: string;
  password: string;
}
