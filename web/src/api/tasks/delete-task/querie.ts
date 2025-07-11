import { api } from "@/lib/axios";
import { ResponseApi, Tasks } from "../@types";

export type DeleteTaskParams = {
  id: string;
};

export const deleteTask = async (
  params: DeleteTaskParams
): Promise<ResponseApi<Tasks>> => {
  const { data } = await api.delete<Tasks>(`/tasks/${params.id}`);
  return {
    value: data,
  };
};
