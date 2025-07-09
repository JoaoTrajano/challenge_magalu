export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type Tasks = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseApi<T> = {
  value: T;
};
