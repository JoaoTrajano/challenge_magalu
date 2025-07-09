export type Tasks = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
