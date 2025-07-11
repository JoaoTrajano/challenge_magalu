import { useQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "./query-options";
import { FetchTasksParams } from "./queries";

export function useFetchTasks({ status }: FetchTasksParams) {
  return useQuery(tasksQueryOptions({ status }));
}
