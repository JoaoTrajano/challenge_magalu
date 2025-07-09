import { Either, left, rigth } from '@/shared/errors/either';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UseCase } from '../use-case.interface';

type UpdateTaskUseCaseInput = {
  id: string;
  title?: string;
};

type UpdateTaskUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    task: TaskEntity;
  }
>;

export class UpdateTaskUseCase
  implements UseCase<UpdateTaskUseCaseInput, UpdateTaskUseCaseOutput>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    input: UpdateTaskUseCaseInput,
  ): Promise<UpdateTaskUseCaseOutput> {
    const taskFound = await this.taskRepository.fetchById(input.id);
    if (!taskFound) return left(new ResourceNotFoundError('Task not found'));

    if (input.title) taskFound.title = input.title;

    const taskUpdated = await this.taskRepository.update(taskFound);
    return rigth({ task: taskUpdated });
  }
}
