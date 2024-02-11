import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { IFormation, PatternType } from './interfaces/formation.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Formation } from '../../shemas/Formation/formation.schema';
import { Model } from 'mongoose';

export const resultType: IFormation[] = [
  {
    id: 1,
    name: '4-4-2',
    default: false,
    pattern: [4, 4, 2],
    patternType: PatternType.BALANCED,
  },
  {
    id: 2,
    name: '4-3-3',
    default: true,
    pattern: [4, 3, 3],
    patternType: PatternType.ATTACK,
  },
  {
    id: 3,
    name: '5-4-1',
    default: true,
    pattern: [5, 4, 1],
    patternType: PatternType.DEFENCE,
  },
];

@Injectable()
export class FormationService {
  private result: IFormation[] = resultType;

  constructor(
    @InjectModel(Formation.name) private formationModel: Model<Formation>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<boolean> {
    try {
      if (
        this.result.find(
          (x: IFormation) =>
            x.name === createFormationDto.name &&
            x.patternType === createFormationDto.patternType,
        )
      ) {
        return false;
      }

      const newFormation: IFormation = {
        id: this.result[this.result.length - 1].id + 1,
        name: createFormationDto.name,
        default: createFormationDto.default,
        pattern: createFormationDto.pattern,
        patternType: createFormationDto.patternType,
      };

      const createdNewFormation = new this.formationModel(newFormation);
      return !!(await createdNewFormation.save());
    } catch (e) {
      return false;
    }
  }

  async addMultiFormation(
    createFormationDto: CreateFormationDto[],
  ): Promise<boolean> {
    try {
      const formations: Formation[] = createFormationDto;
      const insertedFormations =
        await this.formationModel.insertMany(formations);

      for (const formation of insertedFormations) {
        await formation.save();
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async findAll(): Promise<IFormation[]> {
    return this.formationModel.find();
  }

  async findOne(id: string): Promise<UpdateFormationDto> {
    const response = await this.formationModel
      .findById(id)
      .then((r: any) => {
        return r;
      })
      .catch((e: any) => {
        return e;
      });

    return {
      name: response.name,
      default: response.default,
      pattern: response.pattern,
      patternType: response.patternType,
    };
  }

  async update(
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Promise<boolean> {
    const result = await this.formationModel
      .updateOne({ _id: id }, updateFormationDto)
      .then((r: any) => {
        return r;
      })
      .catch((e) => {
        return e;
      });

    return !!result.matchedCount;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.formationModel
        .deleteOne({ _id: id })
        .then((r: any) => {
          return r;
        })
        .catch((e) => {
          return e;
        });

      console.log(result);

      return !!result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
