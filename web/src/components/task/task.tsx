import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { formatDateBR } from "@/lib/utils";
import { useDeleteTask, useUpdateTaskStatus } from "@/api/tasks";
import { useCallback } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseApi, Tasks, TaskStatus } from "@/api/tasks/@types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const { mutateAsync: deleteTask, isPending } = useDeleteTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Erro ao deletar tarefa!");
    },
  });

  const handleDeleteTask = useCallback(async () => {
    deleteTask({ id });
  }, [id, deleteTask]);

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
    <div
      className={`flex justify-between items-center p-4 border rounded-xl shadow-sm gap-4 hover:bg-gray-50 ${
        isUpdatingStatus ? "opacity-50" : ""
      }${status === TaskStatus.COMPLETED ? "bg-gray-50/90 opacity-50" : ""}`}
    >
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
        <div className="flex flex-col flex-1">
          <span
            className={`text-base text-gray-800  ${
              status === TaskStatus.COMPLETED ? "line-through " : ""
            }`}
            style={{ wordBreak: "break-word" }}
          >
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">
          Criado em: {formatDateBR(createdAt)}
        </span>
        <Button variant="ghost" size="icon" onClick={handleDeleteTask}>
          {isPending ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Trash className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          )}
        </Button>
      </div>
    </div>
  );
};
