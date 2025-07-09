import { Either, rigth } from '@/shared/errors/either';
import { TaskEntity, TaskStatus } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { UseCase } from '../use-case.interface';

export type FetchTasksUseCaseInput = {
  status: TaskStatus;
};

export type FetchTasksUseCaseOutput = Either<
  unknown,
  {
    tasks: TaskEntity[];
  }
>;

export class FetchTasksUseCase
  implements UseCase<FetchTasksUseCaseInput, FetchTasksUseCaseOutput>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    input: FetchTasksUseCaseInput,
  ): Promise<FetchTasksUseCaseOutput> {
    const tasks = await this.taskRepository.fetch(input.status);

    return rigth({ tasks });
  }
}
