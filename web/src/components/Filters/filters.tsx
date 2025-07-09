import { useState } from "react";
import { Button } from "../ui/button";

export const Filters = () => {
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  return (
    <div className="flex gap-2 mb-4">
      <Button
        onClick={() => setFilter("all")}
        className={`px-4 py-1 rounded border ${
          filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-100"
        }`}
      >
        Todas
      </Button>
      <Button
        onClick={() => setFilter("pending")}
        className={`px-4 py-1 rounded border ${
          filter === "pending" ? "bg-blue-100 text-blue-700" : "text-gray-100"
        }`}
      >
        Pendentes
      </Button>
      <Button
        onClick={() => setFilter("done")}
        className={`px-4 py-1 rounded border ${
          filter === "done" ? "bg-blue-100 text-blue-700" : "text-gray-100"
        }`}
      >
        Concluídas
      </Button>
    </div>
  );
};
