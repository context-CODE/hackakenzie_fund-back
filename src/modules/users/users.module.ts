import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repository/users.repository';
import { UsersPrismaRepository } from './repository/prisma/users.prisma.repository';
import { MailServerModule } from '../mail-server/mail-server.module';

@Module({
  imports: [MailServerModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
