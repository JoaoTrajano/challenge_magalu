"use client";

import { useAddTask } from "@/api/tasks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage } from "../form-message";

const addTaskSchema = z.object({
  title: z.string().min(1, "Título da tarefa é obrigatório."),
});
type AddTaskSchemaType = z.infer<typeof addTaskSchema>;

export const Form = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskSchemaType>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(addTaskSchema),
  });

  const { mutateAsync: addTask } = useAddTask();

  async function handleAddTask(data: AddTaskSchemaType) {
    await addTask({
      title: data.title,
    });
  }

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit(handleAddTask)}>
      <Input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Digite uma nova tarefa..."
      />
      {errors.title && <FormMessage message={errors.title.message} />}
      <Button
        type="submit"
        className=" text-white px-4 py-2 rounded"
        disabled={isSubmitting}
      >
        Adicionar Tarefa
      </Button>
    </form>
  );
};
