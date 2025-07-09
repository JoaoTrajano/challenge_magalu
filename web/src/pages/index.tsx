import { Filters } from "@/components/Filters/filters";
import { Form } from "@/components/Form/form";
import { Task } from "@/components/task";

const mockTasks = [
  { id: "1", title: "Comprar pão", done: false, createdAt: "24/04/2024" },
  { id: "2", title: "Lavar o carro", done: true, createdAt: "24/04/2024" },
  {
    id: "3",
    title: "Estudar para o exame",
    done: false,
    createdAt: "24/04/2024",
  },
  { id: "4", title: "Fazer exercícios", done: false, createdAt: "24/04/2024" },
];

export default function Home() {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Tarefas</h1>
      <Form />
      <Filters />

      <div className="space-y-2">
        {mockTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            createdAt={task.createdAt}
          />
        ))}
      </div>
    </main>
  );
}
