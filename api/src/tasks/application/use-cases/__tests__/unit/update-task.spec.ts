import { beforeAll, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@/tasks/application/errors/resource-not-found-error';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskInMemoryRepository } from '@/tasks/infrastructure/database/in-memory/repositories/task-in-memory-repository';

import { UpdateTaskUseCase } from '../../update-task.usecase';

let sut: UpdateTaskUseCase;
let repo: TaskInMemoryRepository;

beforeAll(() => {
  repo = new TaskInMemoryRepository();
  sut = new UpdateTaskUseCase(repo);
});

describe('UpdateTasks unit test', () => {
  it('should throw an error if the tasks not exist', async () => {
    const result = await sut.execute({
      id: 'id-not-exist',
      title: 'new title',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).instanceOf(ResourceNotFoundError);
  });

  it('should be able update the tasks title', async () => {
    repo.tasks.push(new TaskEntity('Test Task'));

    await sut.execute({ id: repo.tasks[0].id, title: 'new tile' });

    expect(repo.tasks[0].title).toEqual('new tile');
  });
});
