import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    console.log(req.user);
    console.log(req);
    return req.user;
  }
}
