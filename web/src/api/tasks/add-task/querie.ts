import { api } from "@/lib/axios";
import { ResponseApi, Tasks } from "../@types";

export type AddTaskParams = {
  title: string;
};

export const addTask = async (
  body: AddTaskParams
): Promise<ResponseApi<Tasks>> => {
  const { data } = await api.post<Tasks>("/tasks", body);
  return {
    value: data,
  };
};
