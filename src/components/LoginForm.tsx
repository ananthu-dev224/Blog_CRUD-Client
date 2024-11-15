import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../services/auth";
import { userLogin } from "../redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  // Formik hook to handle form submission and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const loginData = {
        email: values.email,
        password: values.password,
      };
      const result = await login(loginData);
      if (result.status === "success") {
        toast.success("Welcome Back to Blogger.");
        dispatch(userLogin({ user: result.user, token: result.token }));
        navigate("/home");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg flex overflow-hidden md:min-h-[450px] min-h-[400px]">
        <div className="w-1/2 p-6">
          <h1 className="text-2xl text-center font-semibold mb-4 text-gray-800">
            Welcome Back
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mb-3 min-h-[80px]">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 outline-none p-2 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : (
                <p className="min-h-[24px]"></p>
              )}
            </div>
            {/* Password */}
            <div className="mb-3 min-h-[80px]">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full border border-gray-300 outline-none p-2 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : (
                <p className="min-h-[24px]"></p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-400 font-semibold text-white py-2 rounded-md hover:bg-gray-500 transition"
            >
              Login
            </button>
            <p className="text-sm mt-5">
              New User ?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-blue-500">
          <img
            src="/blog-log.jpg"
            alt="Register Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};