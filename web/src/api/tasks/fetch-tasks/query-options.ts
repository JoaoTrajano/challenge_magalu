import { fetchTasks, FetchTasksParams } from "./queries";

export const tasksQueryOptions = ({ status }: FetchTasksParams) => ({
  queryKey: ["tasks", status],
  queryFn: () => fetchTasks({ status }),
});
