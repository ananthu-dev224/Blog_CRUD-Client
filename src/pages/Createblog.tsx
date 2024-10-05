import { FC } from 'react';
import Navbar from '../components/Navbar';
import CreateBlogForm from '../components/CreateBlogForm';
import { useNavigate } from 'react-router-dom';


const CreateBlog: FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      <div className='ml-14 text-sm mt-4 font-medium cursor-pointer' onClick={() => navigate("/home")}>
        <span>⬅️ Back to Home</span>
      </div>
      {/* Create Blog Form */}
      <div className="container mx-auto p-6">
        <CreateBlogForm />
      </div>
    </div>
  );
};


export default CreateBlog;