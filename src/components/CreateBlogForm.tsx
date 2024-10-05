import { FC, useState, ChangeEvent } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createBlog } from "../services/blog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  image: Yup.mixed()
    .nullable()
    .required("Image is required")
    .test("FILE_FORMAT", "Only image files are allowed", (value) => {
      return (
        value instanceof File &&
        ["image/jpeg", "image/png", "image/gif"].includes(value.type)
      );
    }),
});

const CreateBlogForm: FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Handle image file upload and preview
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files ? e.target.files[0] : null;

    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      setFieldValue("image", file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue("image", null);
      setImagePreview(null);
    }
  };

  return (
    <Formik
      initialValues={{ title: "", description: "", image: null }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log(values);
        const { title, description, image } = values;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
          formData.append("image", image);
        } else {
          console.log("No image selected");
        }


        const result = await createBlog(formData,dispatch);
        if (result.status === "success") {
          toast.success("Blog created success.");
          navigate("/home");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create a New Blog
          </h2>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1"
              placeholder="Give suitable title for your blog"
            />
            <div className="h-5">
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Image Upload with Preview */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Add Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setFieldValue)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="h-5">
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-w-xs max-h-48 object-cover mx-auto"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1"
              placeholder="Write your thoughts here..."
              rows={4}
            />
            <div className="h-5">
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 text-white py-2 px-4 font-semibold rounded hover:bg-gray-700 transition"
            >
              Create Blog
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBlogForm;
