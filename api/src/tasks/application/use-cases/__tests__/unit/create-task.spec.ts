import { beforeAll, describe, expect, it } from 'vitest';

import { MissingFieldError } from '@/tasks/application/errors/missing-field-error';
import { TaskInMemoryRepository } from '@/tasks/infrastructure/database/in-memory/repositories/task-in-memory-repository';

import { CreateTaskUseCase } from '../../create-task.usecase';

let sut: CreateTaskUseCase;
let repo: TaskInMemoryRepository;

beforeAll(() => {
  repo = new TaskInMemoryRepository();
  sut = new CreateTaskUseCase(repo);
});

describe('CreateTaskUseCase unit test', () => {
  it('should be able create a task with correct properties', async () => {
    const title = 'Test Task';
    const result = await sut.execute({ title });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      const { task } = result.value;
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title', title);
      expect(task.createdAt).toBeInstanceOf(Date);
    }
  });

  it('should throw an error if the title is empty', async () => {
    const result = await sut.execute({
      title: '',
    });
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).instanceOf(MissingFieldError);
  });
});
