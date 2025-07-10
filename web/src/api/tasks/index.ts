import { fetchTasks, FetchTasksParams } from "@/api/tasks/fetch-tasks";

export const tasksQueryOptions = ({ status }: FetchTasksParams) => ({
  queryKey: ["tasks", status],
  queryFn: () => fetchTasks({ status }),
});

export * from "@/api/tasks/add-task";
export * from "@/api/tasks/fetch-tasks";
