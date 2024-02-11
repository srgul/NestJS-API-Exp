import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  age: number;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
