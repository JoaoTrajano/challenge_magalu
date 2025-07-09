import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { ResponseApi, Tasks } from "./@types";

type FetchTasksParams = {
  status?: string;
};

async function fetchTasks({
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
  return useQuery({
    queryKey: ["tasks", status],
    queryFn: () => fetchTasks({ status }),
  });
}
