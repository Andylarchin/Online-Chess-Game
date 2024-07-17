import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return user;
  }
}
