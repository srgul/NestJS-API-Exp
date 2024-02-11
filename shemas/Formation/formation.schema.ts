import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Formation {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  default: boolean;

  @Prop()
  patternType: string;

  @Prop({
    required: true,
  })
  pattern: number[];
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
