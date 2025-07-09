import { Entity } from '@/shared/domain/entity';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class TaskEntity extends Entity {
  public title: string;
  public status: TaskStatus;

  constructor(title: string) {
    super();
    this.title = title;
    this.status = TaskStatus.PENDING;
  }

  public markStatusAsCompleted(): void {
    this.status = TaskStatus.COMPLETED;
  }

  public markStatusAsPending(): void {
    this.status = TaskStatus.PENDING;
  }
}
