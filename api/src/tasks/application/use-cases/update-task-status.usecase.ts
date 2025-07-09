import { Either, left, rigth } from '@/shared/errors/either';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UseCase } from '../use-case.interface';

type UpdateTaskStatusUseCaseInput = {
  id: string;
  completed: boolean;
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

    if (input.completed) {
      taskFound.markStatusAsCompleted();
    } else {
      taskFound.markStatusAsPending();
    }

    const taskUpdated = await this.taskRepository.update(taskFound);
    return rigth({ task: taskUpdated });
  }
}
