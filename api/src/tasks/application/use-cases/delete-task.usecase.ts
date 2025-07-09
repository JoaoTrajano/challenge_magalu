import { Either, left, rigth } from '@/shared/errors/either';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UseCase } from '../use-case.interface';

type DeleteTaskUseCaseInput = {
  id: string;
};

type DeleteTaskUseCaseOutput = Either<
  ResourceNotFoundError,
  { task: TaskEntity }
>;

export class DeleteTaskUseCase
  implements UseCase<DeleteTaskUseCaseInput, DeleteTaskUseCaseOutput>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    input: DeleteTaskUseCaseInput,
  ): Promise<DeleteTaskUseCaseOutput> {
    const task = await this.taskRepository.fetchById(input.id);

    if (!task) return left(new ResourceNotFoundError('Task not Found.'));

    await this.taskRepository.delete(input.id);

    return rigth({ task });
  }
}
