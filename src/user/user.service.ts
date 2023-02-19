import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, FindUserDto, LoginUserDto } from './dtos';
import * as argon from 'argon2';
import { getUserList } from './utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
  //find a user
  async findUser(user: FindUserDto, option?: boolean) {
    if (option) {
      return await this.userRepository.findOne({
        select: getUserList,
        where: { username: user.username },
      });
    } else {
      return await this.userRepository.findOneBy({ username: user.username });
    }
  }

  // Create User
  async createUser(userPayload: CreateUserDto): Promise<any> {
    const userExist = await this.findUser({ username: userPayload.username });
    console.log(userExist);

    if (userExist) {
      throw new ForbiddenException('User exits! Please, login');
    }
    userPayload.password = await argon.hash(userPayload.password);

    const newUser = this.userRepository.create(userPayload);
    const savedUser = await this.userRepository.save(newUser);
    const { password, ...userData } = savedUser;
    return userData;
  }
}
