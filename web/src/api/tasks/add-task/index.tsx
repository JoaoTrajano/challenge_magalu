import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseApi, Tasks } from "../@types";
import { addTask, AddTaskParams } from "./querie";

export const useAddTask = (
  options?: UseMutationOptions<ResponseApi<Tasks>, AxiosError, AddTaskParams>
) =>
  useMutation<ResponseApi<Tasks>, AxiosError, AddTaskParams>({
    mutationKey: ["create-task"],
    mutationFn: async (body) => await addTask(body),
    ...options,
  });
