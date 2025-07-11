import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResponseApi, Tasks } from "../@types";
import { updateTaskStatus, UpdateTaskStatusParams } from "./querie";

export const useUpdateTaskStatus = (
  options?: UseMutationOptions<
    ResponseApi<Tasks>,
    AxiosError,
    UpdateTaskStatusParams
  >
) =>
  useMutation<ResponseApi<Tasks>, AxiosError, UpdateTaskStatusParams>({
    mutationKey: ["update-task-status"],
    mutationFn: async (body) => await updateTaskStatus(body),
    ...options,
  });
