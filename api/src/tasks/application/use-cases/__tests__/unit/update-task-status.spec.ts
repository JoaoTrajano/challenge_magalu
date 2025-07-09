import { beforeAll, describe, expect, it } from 'vitest';

import { ResourceNotFoundError } from '@/tasks/application/errors/resource-not-found-error';
import { TaskEntity } from '@/tasks/domain/entities/task.entity';
import { TaskInMemoryRepository } from '@/tasks/infrastructure/database/in-memory/repositories/task-in-memory-repository';

import { UpdateTaskStatusUseCase } from '../../update-task-status.usecase';

let sut: UpdateTaskStatusUseCase;
let repo: TaskInMemoryRepository;

beforeAll(() => {
  repo = new TaskInMemoryRepository();
  sut = new UpdateTaskStatusUseCase(repo);
});

describe('UpdateTaksStatus unit test', () => {
  it('should throw an error if the tasks not exist', async () => {
    const result = await sut.execute({ id: 'id-not-exist', completed: true });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).instanceOf(ResourceNotFoundError);
  });

  it('should be able update the tasks status to completed', async () => {
    repo.tasks.push(new TaskEntity('Test Task'));

    await sut.execute({ id: repo.tasks[0].id, completed: true });

    expect(repo.tasks[0].status).toEqual('COMPLETED');
  });

  it('should be able update the tasks status to pending', async () => {
    const task = new TaskEntity('Test Task');
    task.markStatusAsPending();

    repo.tasks.push(task);

    await sut.execute({ id: repo.tasks[0].id, completed: false });

    expect(repo.tasks[0].status).toEqual('PENDING');
  });
});
