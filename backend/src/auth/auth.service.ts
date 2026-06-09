import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async upsertGithubUser(user: any) {
    return this.prisma.user.upsert({
      where: {
        githubId: user.githubId,
      },
      update: {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        accessToken: user.accessToken,
      },
      create: {
        githubId: user.githubId,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        accessToken: user.accessToken,
      },
    });
  }
}