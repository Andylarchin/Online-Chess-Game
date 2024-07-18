import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './schemes/auth.schema';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async create(createUserDto: createUserDto): Promise<Auth> {
    const findUser = await this.authModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (findUser) {
      throw new ConflictException('User with this username already exists.');
    } else {
      const createdUser = new this.authModel(createUserDto);
      return createdUser.save();
    }
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.authModel.findOne({ username }).exec();
    if (!findUser) return null;
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      return this.jwtService.sign({
        _id: findUser._id,
        username: findUser.username,
      });
    }
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    username: string,
  ) {
    const findUser = await this.authModel
      .findOne({ username: username })
      .exec();

    console.log(username, oldPassword, newPassword, findUser);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, findUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    findUser.password = newHashedPassword;
    await findUser.save();
  }
}
