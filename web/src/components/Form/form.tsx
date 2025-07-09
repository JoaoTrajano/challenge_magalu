import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Form = () => {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Digite uma nova tarefa..."
      />
      <Button className=" text-white px-4 py-2 rounded">
        Adicionar Tarefa
      </Button>
    </div>
  );
};
