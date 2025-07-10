import { useDeleteTask } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Trash } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

export function ModalDeleteTask({ id }: Props) {
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            {isPending ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Trash className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir tarefa</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja remover esta tarefa?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              onClick={handleDeleteTask}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
