import { FC, useState, ChangeEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EditBlogFormProps } from '../types/interfaces';


const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  image: Yup.mixed().nullable(),
});

const EditBlogForm: FC<EditBlogFormProps> = ({ blogData, onClose, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(blogData.imageUrl);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      setImageError(null);
      setFieldValue('image', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageError('Please upload a valid image file');
      setImagePreview(blogData.imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full max-h-[80vh] overflow-y-auto">
        <Formik
          initialValues={{ title: blogData.title, description: blogData.description, image: null }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <h2 className="text-xl font-bold mb-4 text-center">Edit Blog</h2>

              {/* Title */}
              <div className="mb-3">
                <label htmlFor="title" className="block text-gray-700 mb-1">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="h-4">
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Image Upload with Preview */}
              <div className="mb-3">
                <label htmlFor="image" className="block text-gray-700 mb-1">Update Image (optional)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="h-4">
                  {imageError && <div className="text-red-500 text-sm">{imageError}</div>}
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="max-w-full h-32 object-cover mx-auto"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                />
                <div className="h-4">
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-600 text-white py-1 px-3 font-semibold rounded hover:bg-gray-700 transition"
                >
                  Update Blog
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditBlogForm;