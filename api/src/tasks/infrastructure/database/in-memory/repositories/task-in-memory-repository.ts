import { TaskEntity, TaskStatus } from '@/tasks/domain/entities/task.entity';
import { TaskRepository } from '@/tasks/domain/repositories/task.repository';

export class TaskInMemoryRepository extends TaskRepository {
  public tasks: TaskEntity[] = [];

  constructor() {
    super();
  }

  async create(task: TaskEntity): Promise<TaskEntity> {
    this.tasks.push(task);
    return task;
  }

  async update(task: TaskEntity): Promise<TaskEntity | null> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index === -1) return null;

    this.tasks[index] = task;
    return task;
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  async fetch(status: TaskStatus): Promise<TaskEntity[]> {
    const tasks = this.tasks.filter((task) => {
      if (status && !task.statusValue.includes(status)) return false;
      return true;
    });

    return tasks;
  }

  async fetchById(id: string): Promise<TaskEntity | null> {
    const task = this.tasks.find((task) => task.id === id);
    return task ? task : null;
  }
}
