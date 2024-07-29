import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './modules/auth/schemes/auth.schema';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:59031/chess', {
      user: 'chess',
      pass: 'chess',
    }),
    PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UserModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
