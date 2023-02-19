import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser({ username }, true);
    if (!user) {
      throw new NotFoundException('User not Found!');
    }
    const passwordValid = await argon.verify(user.password, password);
    if (!passwordValid) {
      throw new ForbiddenException('Password Does Not Match!');
    }

    if (user && passwordValid) {
      // return {
      //   userId: user.id,
      //   username: user.username,
      // };
      const { password, ...userData } = user;
      return userData;
    }
    return null;
  }

  createUser(userPayload: CreateUserDto) {
    return this.userService.createUser(userPayload);
  }
}
