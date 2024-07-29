import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: createUserDto): Promise<void> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.create(createUserDto);
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return this.jwtService.sign({
        _id: user._id,
        username: user.username,
      });
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async changePassword(oldPassword: string, newPassword: string, username: string): Promise<void> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    await this.userService.updatePassword(username, newPassword);
  }
}