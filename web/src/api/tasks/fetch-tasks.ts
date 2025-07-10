import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { ResponseApi, Tasks } from "./@types";
import { tasksQueryOptions } from ".";

export type FetchTasksParams = {
  status?: string | null;
};

export async function fetchTasks({
  status,
}: FetchTasksParams): Promise<ResponseApi<Tasks[]>> {
  const { data } = await api.get<{ tasks: Tasks[] }>("/tasks", {
    params: {
      status,
    },
  });

  return {
    value: data.tasks,
  };
}

export function useFetchTasks({ status }: FetchTasksParams) {
  return useQuery(tasksQueryOptions({ status }));
}
