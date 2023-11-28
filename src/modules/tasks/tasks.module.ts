import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
