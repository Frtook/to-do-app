import { TaskType } from "@/components/modals/AddTask";
import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await apiClient.get("/todos/fetch/all");
      return res.data.data as Task[];
    },
  });
};

export const useGetOneTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await apiClient.get(`/todos/get/${id}`);
      return res.data as Task;
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TaskType) =>
      await apiClient.post("/todos/create", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

type CompletedType = {
  data: { is_completed: boolean };
  id: string;
};
export const useCompletedTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: CompletedType) =>
      await apiClient.put(`/todos/update/${id}`, data),
    onMutate: () => {
      message.loading("Updating...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      message.success("updated successfully!");
    },
  });
};
