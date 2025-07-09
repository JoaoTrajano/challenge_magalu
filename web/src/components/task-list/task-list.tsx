import { Task } from "../task";

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

export const TaskList = () => {
  return (
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
  );
};
