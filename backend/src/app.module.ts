import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    RepositoryModule,
  ],
})
export class AppModule {}