import { Filters } from "@/components/filters";
import { Form } from "@/components/form";
import { TaskList } from "@/components/task-list";

export default function Home() {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <Form />
      <Filters />
      <TaskList />
    </main>
  );
}
