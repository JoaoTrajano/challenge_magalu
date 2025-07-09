import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FetchTasksUseCase,
  UpdateTaskStatusUseCase,
  UpdateTaskUseCase,
} from './application/use-cases';
import { TaskRepository } from './domain/repositories/task.repository';
import { TaskPrismaRepository } from './infrastructure/database/prisma/repositories/task-prisma-repository';
import { TaskController } from './presentation/controllers/task.controller';

@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'TaskRepository',
      useFactory: (prismaService: PrismaService) => {
        return new TaskPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CreateTaskUseCase',
      useFactory: (taskRepository: TaskRepository) => {
        return new CreateTaskUseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: 'UpdateTaskUseCase',
      useFactory: (taskRepository: TaskRepository) => {
        return new UpdateTaskUseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: 'UpdateTaskStatusUseCase',
      useFactory: (taskRepository: TaskRepository) => {
        return new UpdateTaskStatusUseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: 'DeleteTaskUseCase',
      useFactory: (taskRepository: TaskRepository) => {
        return new DeleteTaskUseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: 'FetchTasksUseCase',
      useFactory: (taskRepository: TaskRepository) => {
        return new FetchTasksUseCase(taskRepository);
      },
      inject: ['TaskRepository'],
    },
  ],
})
export class TasksModule {}
