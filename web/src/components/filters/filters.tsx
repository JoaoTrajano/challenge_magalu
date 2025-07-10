import { TaskStatus } from "@/api/tasks/@types";
import { Button } from "../ui/button";
import { useTaskFilter } from "./hooks/useFilters";
import { cn } from "@/lib/utils";

export const Filters = () => {
  const { status, setStatus } = useTaskFilter();

  return (
    <div className="flex gap-2 mb-4">
      <Button
        onClick={() => setStatus(null)}
        className={cn(
          "px-4 py-1 rounded-xl border hover:bg-blue-100/90",
          status === null ? "bg-blue-100/90 text-black" : "bg-white text-black"
        )}
      >
        Todas
      </Button>
      <Button
        onClick={() => setStatus(TaskStatus.PENDING)}
        className={cn(
          "px-4 py-1 rounded-xl border hover:bg-blue-100/90",
          status === TaskStatus.PENDING
            ? "bg-blue-100/90 text-black"
            : "bg-white text-black"
        )}
      >
        Pendentes
      </Button>
      <Button
        onClick={() => setStatus(TaskStatus.COMPLETED)}
        className={cn(
          "px-4 py-1 rounded-xl border hover:bg-blue-100/90",
          status === TaskStatus.COMPLETED
            ? "bg-blue-100/90 text-black"
            : "bg-white text-black"
        )}
      >
        Concluídas
      </Button>
    </div>
  );
};
