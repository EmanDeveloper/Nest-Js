
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  admin = 'admin',
  user = 'user',
}

@Schema()
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true , unique: true})
  email!: string;

  @Prop({ enum: UserRole, default: UserRole.user })
  role!: UserRole;

  @Prop({ required: true ,minlength: 6})
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
