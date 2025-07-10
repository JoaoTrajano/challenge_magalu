import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {
  count?: number;
};

const SkeletonTaskList = ({ count = 5 }: Props) => {
  return (
    <div className="list-none p-0 m-0">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center py-3 border-b border-gray-200"
        >
          <Skeleton className="w-5 h-5 bg-gray-200 rounded mr-4" />
          <Skeleton className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTaskList;
