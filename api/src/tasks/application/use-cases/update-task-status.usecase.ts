import { Either, left, rigth } from '@/shared/errors/either';
import { TaskEntity, TaskStatus } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UseCase } from '../use-case.interface';

type UpdateTaskStatusUseCaseInput = {
  id: string;
  newStatus: TaskStatus;
};

type UpdateTaskStatusUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    task: TaskEntity;
  }
>;

export class UpdateTaskStatusUseCase
  implements
    UseCase<UpdateTaskStatusUseCaseInput, UpdateTaskStatusUseCaseOutput>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    input: UpdateTaskStatusUseCaseInput,
  ): Promise<UpdateTaskStatusUseCaseOutput> {
    const taskFound = await this.taskRepository.fetchById(input.id);
    if (!taskFound) return left(new ResourceNotFoundError('Task not found'));

    taskFound.updateStatusValue = input.newStatus;

    const taskUpdated = await this.taskRepository.update(taskFound);
    return rigth({ task: taskUpdated });
  }
}
