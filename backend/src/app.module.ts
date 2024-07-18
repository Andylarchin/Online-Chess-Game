import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './modules/auth/schemes/auth.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:59031/chess', {
      user: 'chess',
      pass: 'chess',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
