import { TaskStatus } from "@/api/tasks/@types";
import { create } from "zustand";

type TaskFilterStore = {
  status?: TaskStatus | null;
  setStatus: (status?: TaskStatus | null) => void;
};

export const useTaskFilter = create<TaskFilterStore>((set) => ({
  status: null,
  setStatus: (status) => set({ status }),
}));
