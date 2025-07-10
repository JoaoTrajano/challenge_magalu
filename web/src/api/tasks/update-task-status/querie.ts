import { api } from "@/lib/axios";
import { ResponseApi, Tasks } from "../@types";

export type UpdateTaskStatusParams = {
  id: string;
  completed: boolean;
};

export const updateTaskStatus = async (
  body: UpdateTaskStatusParams
): Promise<ResponseApi<Tasks>> => {
  const { data } = await api.patch<Tasks>(`/tasks/${body.id}`, {
    completed: body.completed,
  });
  return {
    value: data,
  };
};
