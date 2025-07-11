import { Loader } from "lucide-react";
import { Checkbox } from "../../../ui/checkbox";
import { formatDateBR } from "@/lib/utils";
import { useUpdateTaskStatus } from "@/api/tasks";
import { useCallback } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseApi, Tasks, TaskStatus } from "@/api/tasks/@types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalDeleteTask } from "./components/modal-delete-task";
import { TaskTitle } from "./components/task-title";
import { TaskContent } from "./components/task-content";

type Props = {
  data: Tasks;
};

const markAsCompletedSchema = z.object({
  completed: z.nativeEnum(TaskStatus),
});

type MarkAsCompletedType = z.infer<typeof markAsCompletedSchema>;

export const Task = ({ data: { id, title, status, createdAt } }: Props) => {
  const queryClient = useQueryClient();

  const {
    formState: { isSubmitting },
  } = useForm<MarkAsCompletedType>({
    resolver: zodResolver(markAsCompletedSchema),
  });

  const { mutateAsync: updateTaskStatus, isPending: isUpdatingStatus } =
    useUpdateTaskStatus({
      async onSuccess(_, { id, newStatus }) {
        updateTaskStatusOnCache(id, newStatus);
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: () => {
        toast.error("Erro ao atualizar status da tarefa!");
      },
    });

  const handleUpdateTaskStatus = useCallback(
    async (newStatus: TaskStatus) => {
      if (isSubmitting) return;

      await updateTaskStatus({
        id,
        newStatus,
      });
    },
    [id, isSubmitting, updateTaskStatus]
  );

  function updateTaskStatusOnCache(taskId: string, newStatus: TaskStatus) {
    const cacheKey = ["tasks", undefined];
    const tasksListCache =
      queryClient.getQueryData<ResponseApi<Tasks[]>>(cacheKey);

    if (!tasksListCache) {
      console.warn(
        "Não foi possível encontrar tarefas no cache para a chave:",
        cacheKey
      );
      return;
    }

    const updatedTasks = tasksListCache.value.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    queryClient.setQueryData(cacheKey, {
      value: updatedTasks,
    });
  }

  return (
    <TaskContent status={status}>
      <div className="flex items-center gap-2 max-w-full flex-1">
        {isUpdatingStatus ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Checkbox
            id="task-checkbox-new-status"
            checked={status === TaskStatus.COMPLETED}
            onCheckedChange={(checked) => {
              handleUpdateTaskStatus(
                (checked as boolean) ? TaskStatus.COMPLETED : TaskStatus.PENDING
              );
            }}
          />
        )}
        <TaskTitle title={title} status={status} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">
          Criado em: {formatDateBR(createdAt)}
        </span>
        <ModalDeleteTask id={id} />
      </div>
    </TaskContent>
  );
};
