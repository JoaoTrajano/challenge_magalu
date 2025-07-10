import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { formatDateBR } from "@/lib/utils";
import { useDeleteTask, useUpdateTaskStatus } from "@/api/tasks";
import { useCallback, useEffect } from "react";
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
  completed: z.boolean(),
});

type MarkAsCompletedType = z.infer<typeof markAsCompletedSchema>;

export const Task = ({ data: { id, title, status, createdAt } }: Props) => {
  const queryClient = useQueryClient();

  const {
    watch,
    setValue,
    reset,
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

  const { mutateAsync: updateTaskStatus } = useUpdateTaskStatus({
    async onSuccess(_, { id, completed }) {
      updateTaskStatusOnCache(id, completed);
    },
    onError: () => {
      toast.error("Erro ao atualizar status da tarefa!");
    },
  });

  const handleUpdateTaskStatus = useCallback(
    async (completed: boolean) => {
      if (isSubmitting) return;

      await updateTaskStatus({
        id,
        completed,
      });
    },
    [id, isSubmitting, updateTaskStatus]
  );

  function updateTaskStatusOnCache(taskId: string, newStatus: boolean) {
    const cacheKey = ["tasks", undefined];
    const tasksListCache =
      queryClient.getQueryData<ResponseApi<Tasks[]>>(cacheKey);

    if (!tasksListCache) {
      console.warn("No tasks found in cache for key:", cacheKey);
      return;
    }

    const updatedTasks = tasksListCache.value.map((task) =>
      task.id === taskId ? { ...task, completed: newStatus } : task
    );

    queryClient.setQueryData(cacheKey, {
      value: updatedTasks,
    });
  }

  const completed = watch("completed");

  useEffect(() => {
    reset({
      completed: status === TaskStatus.COMPLETED,
    });
  }, [status, reset]);

  return (
    <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <Checkbox
          id="completed"
          checked={completed}
          onCheckedChange={(checked) => {
            setValue("completed", checked as boolean);
            handleUpdateTaskStatus(checked as boolean);
          }}
        />
        <span className="text-base text-gray-800">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{formatDateBR(createdAt)}</span>
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
