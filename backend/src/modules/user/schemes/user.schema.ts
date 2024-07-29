import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, index: true, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  rank: string;

  @Prop({ type: String, required: true })
  bio: string;

  @Prop({ type: String, required: true })
  imageURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);