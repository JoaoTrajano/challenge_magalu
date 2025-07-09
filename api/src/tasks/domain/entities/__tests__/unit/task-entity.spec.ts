import { describe, expect, it } from 'vitest';

import { TaskEntity } from '../../task.entity';

describe('TaskEntity', () => {
  it('should be able to create a task entity', () => {
    const task = new TaskEntity('This is a test task');
    expect(task).toBeInstanceOf(TaskEntity);
    expect(task.status).toEqual('PENDING');
  });

  it('should be able mark as completed', () => {
    const task = new TaskEntity('This is a test task');
    task.markStatusAsCompleted();
    expect(task.status).toEqual('COMPLETED');
  });

  it('should be able mark as pending', () => {
    const task = new TaskEntity('This is a test task');
    task.markStatusAsPending();
    expect(task.status).toEqual('PENDING');
  });
});
