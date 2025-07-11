import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage } from "../form-message";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTask } from "@/api/tasks";
import { Plus } from "lucide-react";

const addTaskSchema = z.object({
  title: z.string().min(1, "Título da tarefa é obrigatório."),
});
type AddTaskSchemaType = z.infer<typeof addTaskSchema>;

export const Form = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<AddTaskSchemaType>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(addTaskSchema),
  });

  const { mutateAsync: addTask } = useAddTask({
    async onSuccess() {
      reset();
      toast.success("Tarefa adicionada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError() {
      toast.error("Não foi possível adicionar a tarefa!");
    },
    onSettled() {
      const input =
        document.querySelector<HTMLInputElement>('input[id="title"]');

      input?.focus();
    },
  });

  async function handleAddTask(data: AddTaskSchemaType) {
    await addTask({
      title: data.title,
    });
  }

  return (
    <form
      className="flex gap-2 mb-4 w-full md:justify-center md:items-center"
      onSubmit={handleSubmit(handleAddTask)}
    >
      <div className="space-y-2 flex-1">
        <Input
          id="title"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Digite uma nova tarefa..."
          {...register("title")}
        />
        {errors.title && <FormMessage message={errors.title.message} />}
      </div>
      <Button
        type="submit"
        className="text-white rounded-sm flex items-center justify-center md:px-4 md:py-2"
        disabled={isSubmitting}
      >
        <span className="hidden md:block">Adicionar Tarefa</span>
        <Plus className="self-center md:ml-2" />
      </Button>
    </form>
  );
};
