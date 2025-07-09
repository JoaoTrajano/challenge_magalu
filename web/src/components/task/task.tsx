import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

type Props = {
  id: string;
  title: string;
  createdAt: string;
};

export const Task = ({ id, title, createdAt }: Props) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <Checkbox />
        <span className="text-base text-gray-800">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{createdAt}</span>
        <Button variant="ghost" size="icon">
          <Trash className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
