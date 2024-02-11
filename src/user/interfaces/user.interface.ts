export interface IUser {
  age: number;
  birthday: string;
  email: string;
  gender: Gender;
  name: string;
  surname: string;
  password: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}