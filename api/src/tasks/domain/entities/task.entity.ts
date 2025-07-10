import { Entity } from '@/shared/domain/entity';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class TaskEntity extends Entity {
  public title: string;
  private status: TaskStatus;

  constructor(title: string) {
    super();
    this.title = title;
    this.status = TaskStatus.PENDING;
  }

  get statusValue(): TaskStatus {
    return this.status;
  }

  set updateStatusValue(status: TaskStatus) {
    switch (status) {
      case TaskStatus.COMPLETED:
        this.markStatusAsCompleted();
        break;
      case TaskStatus.PENDING:
        this.markStatusAsPending();
        break;
      default:
    }
  }

  private markStatusAsCompleted(): void {
    this.status = TaskStatus.COMPLETED;
  }

  private markStatusAsPending(): void {
    this.status = TaskStatus.PENDING;
  }
}
