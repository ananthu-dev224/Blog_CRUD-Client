import api from "../utils/userApi";
import { userLogout } from "../redux/reducers/userSlice";
import { toast } from "sonner";

export const createBlog = async (
  formData: any,
  dispatch: any
): Promise<any> => {
  try {
    const response = await api.post("/user/blog", formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "An error occurred";
      toast.error(message);
      if (
        message === "Invalid token" ||
        message === "No token in request" ||
        message === "Invalid authorization token"
      ) {
        dispatch(userLogout());
      }
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};

export const allBlogs = async (dispatch: any): Promise<any> => {
  try {
    const response = await api.get("/user/all-blogs");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "An error occurred";
      toast.error(message);
      if (
        message === "Invalid token" ||
        message === "No token in request" ||
        message === "Invalid authorization token"
      ) {
        dispatch(userLogout());
      }
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};

export const myBlogs = async (dispatch: any): Promise<any> => {
  try {
    const response = await api.get("/user/my-blogs");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "An error occurred";
      toast.error(message);
      if (
        message === "Invalid token" ||
        message === "No token in request" ||
        message === "Invalid authorization token"
      ) {
        dispatch(userLogout());
      }
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};


export const updateBlog = async (
  formData: any,
  dispatch: any
): Promise<any> => {
  try {
    const response = await api.put("/user/blog", formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "An error occurred";
      toast.error(message);
      if (
        message === "Invalid token" ||
        message === "No token in request" ||
        message === "Invalid authorization token"
      ) {
        dispatch(userLogout());
      }
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};

export const deleteBlog = async (
  blogId: any,
  dispatch: any
): Promise<any> => {
  try {
    const response = await api.delete(`/user/blog/${blogId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "An error occurred";
      toast.error(message);
      if (
        message === "Invalid token" ||
        message === "No token in request" ||
        message === "Invalid authorization token"
      ) {
        dispatch(userLogout());
      }
      return error.response.data;
    } else {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }
};