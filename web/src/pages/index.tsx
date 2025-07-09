import { Filters } from "@/components/Filters/filters";
import { Form } from "@/components/Form/form";
import { TaskList } from "@/components/TaskList/task-list";

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
