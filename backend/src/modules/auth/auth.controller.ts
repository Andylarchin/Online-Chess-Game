import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    console.log(hash);
    const data = this.authService.create({
      username: createUserDto.username,
      password: hash,
    });
    return data;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return user;
  }

  @Put('/change')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
      changePasswordDto.username,
    );
  }
}
