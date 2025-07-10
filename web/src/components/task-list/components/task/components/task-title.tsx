import { TaskStatus } from "@/api/tasks/@types";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  status: TaskStatus;
};

export function TaskTitle({ title, status }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <span
        className={cn("text-base text-gray-800", {
          "line-through": status === TaskStatus.COMPLETED,
        })}
        style={{ wordBreak: "break-word" }}
      >
        {title}
      </span>
    </div>
  );
}
