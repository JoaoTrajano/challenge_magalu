import { Button } from "../ui/button";
import { Loader, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { formatDateBR } from "@/lib/utils";
import { useDeleteTask } from "@/api/tasks";
import { useCallback } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id: string;
  title: string;
  createdAt: Date;
};

export const Task = ({ id, title, createdAt }: Props) => {
  const queryClient = useQueryClient();

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

  return (
    <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <Checkbox />
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
