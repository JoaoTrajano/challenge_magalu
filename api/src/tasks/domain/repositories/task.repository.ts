import { Repository } from '@/shared/infrastructure/database/repository.inteface';

import { TaskEntity, TaskStatus } from '../entities/task.entity';

export abstract class TaskRepository
  implements Omit<Repository<TaskEntity>, 'fetchAll'>
{
  abstract create(task: TaskEntity): Promise<TaskEntity>;
  abstract update(task: TaskEntity): Promise<TaskEntity>;
  abstract delete(id: string): Promise<void>;
  abstract fetch(status?: TaskStatus): Promise<TaskEntity[]>;
  abstract fetchById(id: string): Promise<TaskEntity | null>;
}
