import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/createUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { JwtAuthGuard } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    try {
      await this.authService.create(createUserDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() authPayload: AuthPayloadDto) {
    const accessToken = await this.authService.validateUser(authPayload);

    if (!accessToken) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return { access_token: accessToken };
  }

  @Put('/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    await this.authService.changePassword(
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
      changePasswordDto.username,
    );
    return { message: 'Password changed successfully' };
  }
}