import { PatternType } from '../interfaces/formation.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateFormationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  pattern: number[];

  @IsNotEmpty()
  default: boolean;

  @IsNotEmpty()
  patternType: PatternType;

  @IsNotEmpty()
  password: string;
}
