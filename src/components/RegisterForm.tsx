import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { userLogin } from "../redux/reducers/userSlice";

export const RegisterForm: FC = () => {
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const { name, email, password } = values;
      const registerData = {
        name,
        email,
        password,
      };
      const result = await register(registerData);
      if (result.status === "success") {
        toast.success("Registration Success.");
        dispatch(userLogin({ user: result.user, token: result.token }));
        navigate('/home')
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg flex overflow-hidden min-h-[600px]">
        {/* Left Image Section */}
        <div className="w-1/2 bg-blue-500">
          <img
            src="/blog-reg.jpg"
            alt="Register Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-6">
          <h1 className="text-2xl text-center font-semibold mb-4 text-gray-800">
            Registration
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3 min-h-[80px]">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full border border-gray-300 p-2 outline-none rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              ) : (
                <p className="min-h-[24px]"></p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div className="mb-3 min-h-[80px]">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="mt-1 block w-full border border-gray-300 p-2 outline-none rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
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
              Register
            </button>
            <p className="text-sm mt-5">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
