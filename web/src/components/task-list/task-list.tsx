import { useFetchTasks } from "@/api/tasks";
import { Task } from "../task";
import { useMemo } from "react";

export const TaskList = () => {
  const { data: responseFetchTasks } = useFetchTasks({});

  const tasks = useMemo(
    () => (responseFetchTasks ? responseFetchTasks.value : []),
    [responseFetchTasks]
  );

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          createdAt={task.createdAt}
        />
      ))}
    </div>
  );
};
