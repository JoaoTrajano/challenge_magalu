import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { Tasks } from "./@types";

export type AddTaskParams = {
  title: string;
};

export const addTask = async (body: AddTaskParams): Promise<Tasks> => {
  const { data } = await api.post<Tasks>("/tasks", body);
  return data;
};

export const useAddTask = (
  options?: UseMutationOptions<Tasks, AxiosError, AddTaskParams>
) =>
  useMutation<Tasks, AxiosError, AddTaskParams>({
    mutationKey: ["create-task"],
    mutationFn: async (body) => await addTask(body),
    ...options,
  });
