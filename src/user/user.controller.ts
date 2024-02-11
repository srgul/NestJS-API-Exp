import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserControllerInterface } from './interfaces/user.controller.interface';
import { ResponseType } from '../../helper/response-type/response-type';
import { Promise } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController implements IUserControllerInterface {
  constructor(private readonly userService: UserService) {}

  @Post()
  async Create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseType<boolean>> {
    const responseType: ResponseType<boolean> = new ResponseType<boolean>();
    const result = await this.userService.create(createUserDto);

    responseType.data = !!result;
    responseType.status = !!result;
    responseType.statusCode = !!result ? 201 : 404;

    return responseType;
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<ResponseType<boolean>> {
    const result  = await this.userService.remove(id);

    const responseType = new ResponseType<boolean>();
    responseType.data = !!result;
    responseType.status = !!result;
    responseType.statusCode = !!result ? 200 : 400;

    return responseType;
  }

  @Get()
  async GetAllUsers(): Promise<ResponseType<IUser[]>> {
    const result = await this.userService.findAll();

    const responseType = new ResponseType<IUser[]>();
    responseType.data = result;
    responseType.status = !!result;
    responseType.statusCode = !!result ? 200 : 404;
    return responseType;
  }

  @Get(':id')
  async GetUser(@Param('id') id: string): Promise<ResponseType<IUser>> {
    const result = await this.userService.findOne(id);

    const responseType = new ResponseType<IUser>();
    responseType.data = result;
    responseType.status = !!result;
    responseType.statusCode = !!result ? 200 : 404;
    return responseType;
  }

  @Patch('id')
  async UpdateUser(
    @Param('id') id: string,
    @Body() updateCreateUserDto: UpdateUserDto,
  ): Promise<ResponseType<boolean>> {
    const responseType = new ResponseType<boolean>();
    const result = await this.userService.update(id, updateCreateUserDto);

    responseType.data = !!result;
    responseType.status = !!result;
    responseType.statusCode = !!result ? 200 : 404;

    return responseType;
  }
}
