import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../shemas/User/user.schema';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      const createNewUser = new this.userModel(createUserDto);
      return !!(await createNewUser.save());
    } catch (e) {
      if (e) return false;
    }
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel
      .findById(id)
      .then((r: any) => {
        return r;
      })
      .catch((e: any) => {
        return e;
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    return await this.userModel
      .updateOne({ _id: id }, updateUserDto)
      .then((r: any) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }

  async remove(id: string): Promise<boolean> {
    return await this.userModel
      .deleteOne({
        _id: id,
      })
      .then((r) => {
        return !!r;
      })
      .catch((e: any) => {
        return !!e;
      });
  }
}
