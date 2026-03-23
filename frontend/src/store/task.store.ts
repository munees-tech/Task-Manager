import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

interface Task {
  _id: string;
  title: string;
  content: string;
  userId: string;
}

interface TaskStore {
  loading: boolean;
  error: string | null;
  tasks: Task[];
  getTasks: (userId: string) => Promise<void>;
  postTask: (title: string, content: string, userId: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (title: string, content: string , id:string) => Promise<void>;
  clearError: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  loading: false,
  error: null,
  tasks: [],

  getTasks: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/post/get/task/${userId}`);
      set({ tasks: res.data.tasks, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch tasks";
      set({ error: errorMessage, loading: false });
    }
  },

  postTask: async (title: string, content: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/post/task", {
        title,
        content,
        userId,
      });

      set((state) => ({
        tasks: [...state.tasks, res.data.newTask],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create task";
      set({ error: errorMessage, loading: false });
    }
  },

  deleteTask: async (id: string) => {
    try {
      await axiosInstance.delete(`/post/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task";
      set({ error: errorMessage });
    }
  },

  updateTask: async (title: string, content: string, id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/post/update/task/${id}`, {
        title,
        content,
      });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? res.data.updatedTask : task
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update task";
      set({ error: errorMessage, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
