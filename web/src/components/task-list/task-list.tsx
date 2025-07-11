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
    if (tasks.length > 0) return null;

    if (!status) return <Warning message="Nenhuma tarefa criada." />;

    if (status === TaskStatus.COMPLETED)
      return <Warning message="Nenhuma tarefa concluída." />;

    if (status === TaskStatus.PENDING)
      return <Warning message="Nenhuma tarefa pendente." />;

    return null;
  }, [tasks, status]);

  return (
    <div className="space-y-2 min-h-full">
      {warning}
      {isLoading ? (
        <SkeletonTaskList />
      ) : (
        tasks.map((task) => <Task key={task.id} data={task} />)
      )}
    </div>
  );
};
