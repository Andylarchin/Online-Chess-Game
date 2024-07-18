import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop({ type: String, index: true, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
