import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async createDummyUser() {
    return this.prisma.user.create({
      data: {
        githubId: '123456',
        username: 'nikitha',
        email: 'nikitha@example.com',
        avatarUrl: 'https://github.com/octocat.png',
      },
    });
  }
}