export interface IFormation {
  id: number;
  name: string;
  pattern: number[];
  default: boolean;
  patternType: PatternType;
}

export enum PatternType {
  DEFENCE = 'DEFENCE',
  BALANCED = 'BALANCED',
  ATTACK = 'ATTACK',
}
