import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../global/services/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { PrismaParams } from 'src/shared/interfaces/prismaParams';
import { CreateUserDto } from '../models/user.models';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOne(
    uniqueSelector: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: uniqueSelector,
    });
  }

  async getMany(
    params: PrismaParams,
  ): Promise<{ data: User[]; records: number }> {
    const [data, records] = await Promise.all([
      this.prisma.user.findMany(params),
      this.prisma.user.count(),
    ]);
    return { data, records };
  }

  async create(user: CreateUserDto): Promise<User> {
    console.log(user);
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        username: user.username,
      },
    });
  }
}
