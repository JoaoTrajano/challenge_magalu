import { Either, left, rigth } from '@/shared/errors/either';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

import { MissingFieldError } from '../errors/missing-field-error';
import { UseCase } from '../use-case.interface';

type CreateTaskUseCaseInput = {
  title: string;
};

type CreateTaskUseCaseOutput = Either<MissingFieldError, { task: TaskEntity }>;

export class CreateTaskUseCase
  implements UseCase<CreateTaskUseCaseInput, CreateTaskUseCaseOutput>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    input: CreateTaskUseCaseInput,
  ): Promise<CreateTaskUseCaseOutput> {
    if (!input.title) return left(new MissingFieldError('Title is required'));

    const task = new TaskEntity(input.title);
    const taskCreated = await this.taskRepository.create(task);

    return rigth({ task: taskCreated });
  }
}
