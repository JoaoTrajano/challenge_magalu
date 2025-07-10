import { TaskStatus } from "@/api/tasks/@types";
import { cn } from "@/lib/utils";

type Props = {
  status: TaskStatus;
  children: React.ReactNode;
};

export function TaskContent({ status, children }: Props) {
  return (
    <div
      className={cn(
        `flex justify-between items-center p-4 border rounded-xl shadow-sm gap-4 hover:bg-gray-50`,
        {
          "bg-gray-50/90 opacity-50": status === TaskStatus.COMPLETED,
        }
      )}
    >
      {children}
    </div>
  );
}
