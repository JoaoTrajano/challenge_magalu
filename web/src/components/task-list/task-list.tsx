import { useFetchTasks } from "@/api/tasks";
import { Task } from "../task";
import { useMemo } from "react";
import SkeletonTaskList from "./components/skeleton-task-list";

export const TaskList = () => {
  const {
    data: responseFetchTasks,
    isLoading,
    isRefetching,
  } = useFetchTasks({});

  const tasks = useMemo(
    () => (responseFetchTasks ? responseFetchTasks.value : []),
    [responseFetchTasks]
  );

  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        Nenhuma tarefa adicionada.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {isLoading || isRefetching ? (
        <SkeletonTaskList />
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            createdAt={task.createdAt}
          />
        ))
      )}
    </div>
  );
};
