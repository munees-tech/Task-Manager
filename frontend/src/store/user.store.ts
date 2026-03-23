import { axiosInstance } from "../utils/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignUp: false,
  isLogin: false,
  isCheckingAuth: true,

  checkAuth:async () => {
    try {
      const res = await axiosInstance.get("/me");
      set({authUser:res.data, isCheckingAuth: false});

    } catch (error) {
      set({authUser:null, isCheckingAuth: false});
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/login", { email, password });
      set({ authUser: res.data, isLogin: false });
      toast.success("Login Succesfull");
    } catch (error) {
      toast.error("Login error");
      set({ isLogin: false });
    }
  },
  logout: async () => {
    set({ authUser: null });
    try {
      await axiosInstance.post("/logout");
      set({authUser:null});
      toast.success("logout succesfull")
    } catch (error) {
      toast.error("logout error")
    }
  },
  signup: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    set({ isSignUp: true });
    try {
      const res = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });
      set({ authUser: res.data, isSignUp: false });
      toast.success("signup succesfull")
    } catch (error) {
      toast.error(`Error in signup ${error}`);
      set({ isSignUp: false });
    }
  },
}));
