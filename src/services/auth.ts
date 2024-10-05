import api from "../utils/userApi";
import { toast } from "sonner";
import { loginData, registerData } from "../types/interfaces";

export const register = async (userData: registerData): Promise<any> => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message || "An error occured");
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};

export const login = async (userData: loginData): Promise<any> => {
  try {
    const response = await api.post("/user/login", userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.message || "An error occured");
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};