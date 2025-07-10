import { TaskStatus } from "@/api/tasks/@types";
import { Button } from "../ui/button";
import { useTaskFilter } from "./hooks/useFilters";

export const Filters = () => {
  const { status, setStatus } = useTaskFilter();

  return (
    <div className="flex gap-2 mb-4">
      <Button
        onClick={() => setStatus(null)}
        className={`px-4 py-1 rounded border ${
          status === null ? "bg-blue-100 text-blue-700" : "text-gray-100"
        }`}
      >
        Todas
      </Button>
      <Button
        onClick={() => setStatus(TaskStatus.PENDING)}
        className={`px-4 py-1 rounded border ${
          status === TaskStatus.PENDING
            ? "bg-blue-100 text-blue-700"
            : "text-gray-100"
        }`}
      >
        Pendentes
      </Button>
      <Button
        onClick={() => setStatus(TaskStatus.COMPLETED)}
        className={`px-4 py-1 rounded border ${
          status === TaskStatus.COMPLETED
            ? "bg-blue-100 text-blue-700"
            : "text-gray-100"
        }`}
      >
        Concluídas
      </Button>
    </div>
  );
};
