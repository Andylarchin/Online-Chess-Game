import { Controller, Get, Put, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { checkUserAuthorization } from '../auth/utils/auth.utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard.guards';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: any,
  ) {
    checkUserAuthorization(user._id, id); 
    return this.userService.update(id, updateUserDto);
  }
}