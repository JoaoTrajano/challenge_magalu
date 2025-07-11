import { useFetchTasks } from "@/api/tasks";
import { Task } from "./components/task";
import { useMemo } from "react";
import SkeletonTaskList from "./components/skeleton-task-list";
import { useTaskFilter } from "../filters/hooks/useFilters";
import { TaskStatus } from "@/api/tasks/@types";
import { Warning } from "./components/warning";

export const TaskList = () => {
  const { status } = useTaskFilter();

  const { data: responseFetchTasks, isLoading } = useFetchTasks({
    status,
  });

  const tasks = useMemo(
    () => (responseFetchTasks ? responseFetchTasks.value : []),
    [responseFetchTasks]
  );

  const warning = useMemo(() => {
    if (tasks.length > 0 || isLoading) return null;

    if (!status) return <Warning message="Nenhuma tarefa criada." />;

    if (status === TaskStatus.COMPLETED)
      return <Warning message="Nenhuma tarefa concluída." />;

    if (status === TaskStatus.PENDING)
      return <Warning message="Nenhuma tarefa pendente." />;

    return null;
  }, [tasks, status, isLoading]);

  return (
    <div className="p-4 w-full flex flex-col items-center space-y-4">
      {warning}
      {isLoading ? (
        <SkeletonTaskList />
      ) : (
        tasks.map((task) => <Task key={task.id} data={task} />)
      )}
    </div>
  );
};
