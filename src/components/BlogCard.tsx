import { FC, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditBlogForm from "./EditBlog";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../services/blog";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "sonner";
import { BlogCardProps } from "../types/interfaces";


const BlogCard: FC<BlogCardProps> = ({
  userName,
  title,
  imageUrl,
  content,
  blogId,
  onUpdate,
  isAuthor,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = async (values: {
    title: string;
    description: string;
    image: File | null;
  }) => {
    const { title, description, image } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("blogId", blogId);
    if (image) {
      formData.append("image", image);
    } else {
      console.log("No image selected");
    }

    const result = await updateBlog(formData, dispatch);
    if (result.status === "success") {
      onUpdate("edit", result.blog);
      toast.success("Blog updated success.");
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    confirmAlert({
      title: "Confirm to Delete?",
      message: "This action is irreplacable!",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteBlog(blogId, dispatch);
            if (result.status === "success") {
              onUpdate("delete", result.blog);
              toast.success("Blog deleted success.");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      {/* Content Section */}
      <div className="p-4 relative">
        {/* User Name */}
        <h3 className="absolute top-4 left-4 text-sm font-semibold text-gray-700">
          {userName}
        </h3>

        {isAuthor && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={handleEditClick}
            >
              <FiEdit className="text-xl" />
            </button>
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={handleDelete}
            >
              <FiTrash2 className="text-xl" />
            </button>
          </div>
        )}

        {/* Blog Image */}
        <div className="flex justify-center mt-8 mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-48 object-cover" // Set max width and height for the image
          />
        </div>

        {/* Blog Title */}
        <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
          {title}
        </h2>

        {/* Blog Content */}
        <p className="text-gray-700 text-center">{content}</p>
      </div>
      {isEditing && (
        <EditBlogForm
          blogData={{ title, description: content, imageUrl }}
          onClose={handleCloseEdit}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default BlogCard;