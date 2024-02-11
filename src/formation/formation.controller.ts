import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { IFormation } from './interfaces/formation.interface';
import { IFormationController } from './interfaces/formation.controller.interface';
import { ResponseType } from '../../helper/response-type/response-type';
import { FormationService } from './formation.service';
import { Roles } from '../../helper/roles/roles.decorator';

@Controller('formation')
export class FormationController implements IFormationController {
  constructor(private readonly formationService: FormationService) {}
  @Post('/create')
  async Create(
    @Body() createFormationDto: CreateFormationDto,
  ): Promise<ResponseType<boolean>> {
    const result = !!(await this.formationService.create(createFormationDto));
    return {
      data: result,
      status: result,
      statusCode: result ? 201 : 404,
    };
  }

  @Post('multiadd')
  async AddMultiFormation(
    @Body() createFormationDto: CreateFormationDto[],
  ): Promise<ResponseType<boolean>> {
    const result =
      !!(await this.formationService.addMultiFormation(createFormationDto));
    return {
      data: result,
      status: result,
      statusCode: result ? 201 : 404,
    };
  }

  @Get()
  async FindAll(): Promise<ResponseType<IFormation[]>> {
    return {
      data:
        (await this.formationService.findAll()).length > 0
          ? await this.formationService.findAll()
          : [],
      status: (await this.formationService.findAll()).length > 0,
    };
  }

  @Get(':id')
  async FindOne(
    @Param('id') id: string,
  ): Promise<ResponseType<UpdateFormationDto>> {
    return {
      data: await this.formationService.findOne(id),
      status: true,
      statusCode: 200,
    };
  }

  @Patch(':id')
  async Update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ): Promise<ResponseType<boolean>> {
    return {
      data: await this.formationService.update(id, updateFormationDto),
      statusCode: 200,
      status: true,
    };
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<ResponseType<boolean>> {
    return {
      data: await this.formationService.remove(id),
      status: await this.formationService.remove(id),
      statusCode: 200,
    };
  }
}
