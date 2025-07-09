import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { Tasks } from "./@types";

export type CreateTaskParams = {
  title: string;
};

export const createTask = async (body: CreateTaskParams): Promise<Tasks> => {
  const { data } = await api.post<Tasks>("/tasks", body);
  return data;
};

export const useCreateTask = (
  options?: UseMutationOptions<Tasks, AxiosError, CreateTaskParams>
) =>
  useMutation<Tasks, AxiosError, CreateTaskParams>({
    mutationKey: ["create-task"],
    mutationFn: async (body) => await createTask(body),
    ...options,
  });
