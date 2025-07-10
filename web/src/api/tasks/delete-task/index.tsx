import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseApi, Tasks } from "../@types";
import { deleteTask, DeleteTaskParams } from "./querie";

export const useDeleteTask = (
  options?: UseMutationOptions<ResponseApi<Tasks>, AxiosError, DeleteTaskParams>
) =>
  useMutation<ResponseApi<Tasks>, AxiosError, DeleteTaskParams>({
    mutationKey: ["delete-task"],
    mutationFn: async (body) => await deleteTask(body),
    ...options,
  });
