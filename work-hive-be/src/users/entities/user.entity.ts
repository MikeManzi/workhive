import { Prisma, Role } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: Role;
}
