import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: User) => void): any {
    done(null, user);
  }
  deserializeUser(
    payload: User,
    done: (err: Error, payload: User) => void,
  ): any {
    done(null, payload);
  }
}
