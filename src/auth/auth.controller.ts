import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: UserService) {}

  @Post('signup')
  createUser(@Body() userPayload: CreateUserDto) {
    return this.authService.createUser(userPayload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  userLogin(@Request() req): any {
    return {
      User: req.user,
      msg: 'User logged in',
    };
  }

  //Get / logout
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
