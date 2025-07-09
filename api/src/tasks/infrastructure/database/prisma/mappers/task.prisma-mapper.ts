import { Prisma, Task as PrismaClientTask } from '@prisma/client';

import { TaskEntity, TaskStatus } from '@/tasks/domain/entities/task.entity';

export class TaskPrismaMapper {
  static toDomain(entity: PrismaClientTask): TaskEntity {
    const taskEntitie = new TaskEntity(entity.title);

    taskEntitie.id = entity.id;
    taskEntitie.status = entity.status as TaskStatus;
    taskEntitie.createdAt = entity.createdAt;
    taskEntitie.updatedAt = entity.updatedAt;

    return taskEntitie;
  }

  static toPersistence(entity: TaskEntity): Prisma.TaskUncheckedCreateInput {
    return {
      title: entity.title,
      status: entity.status,
    };
  }
}
