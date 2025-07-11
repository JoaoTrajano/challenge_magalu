import { api } from "@/lib/axios";
import { ResponseApi, Tasks, TaskStatus } from "../@types";

export type UpdateTaskStatusParams = {
  id: string;
  newStatus: TaskStatus;
};

export const updateTaskStatus = async (
  body: UpdateTaskStatusParams
): Promise<ResponseApi<Tasks>> => {
  const { data } = await api.patch<Tasks>(`/tasks/${body.id}`, {
    newStatus: body.newStatus,
  });
  return {
    value: data,
  };
};
