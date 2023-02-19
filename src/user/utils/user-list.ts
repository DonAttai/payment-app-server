import { User } from '../user.entity';

export const getUserList: (keyof User)[] = [
  'id',
  'firstName',
  'lastName',
  'username',
  'password',
  'createdAt',
  'updatedAt',
];
