import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { Tasks } from "./@types";

type FetchTasksParams = {
  status?: string;
};

async function fetchTasks({ status }: FetchTasksParams) {
  const { data } = await api.get<Tasks[]>("/tasks", {
    params: {
      status,
    },
  });

  return data;
}

export function useFetchTasks({ status }: FetchTasksParams) {
  return useQuery({
    queryKey: ["tasks", status],
    queryFn: () => fetchTasks({ status }),
  });
}
