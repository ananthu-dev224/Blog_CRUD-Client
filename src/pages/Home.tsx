import { FC, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { TbWorld } from "react-icons/tb";
import BlogCard from "../components/BlogCard";
import { allBlogs as fetchAllBlogs, myBlogs as fetchMyBlogs } from "../services/blog";
import { useDispatch } from "react-redux";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Home: FC = () => {
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [myBlogs, setMyBlogs] = useState<any[]>([]);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () => {
      const [allBlogsResponse, myBlogsResponse] = await Promise.all([
        fetchAllBlogs(dispatch),
        fetchMyBlogs(dispatch),
      ]);

      // Set the data to state
      if (allBlogsResponse.status === "success") {
        setAllBlogs(allBlogsResponse.blogs);
      }

      if (myBlogsResponse.status === "success") {
        setMyBlogs(myBlogsResponse.blogs);
      }
    };

    fetch();
  }, []);
  const handleUpdate = (type:string,updatedBlog:any) => {
    if (type === "edit") {
      setMyBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
    } else {
      setMyBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== updatedBlog._id)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6">
        {/* Tabs */}
        <TabGroup>
          <TabList className="flex space-x-1 bg-gray-800">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full  py-2.5 text-lg leading-5 flex items-center justify-center font-medium text-gray-700 outline-none",
                  selected
                    ? "bg-gray-200 shadow text-gray-900"
                    : "text-white hover:bg-gray-900"
                )
              }
            >
              <TbWorld />
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-gray-700 outline-none",
                  selected
                    ? "bg-gray-200 shadow text-gray-900"
                    : "text-white hover:bg-gray-900"
                )
              }
            >
              Your Blogs
            </Tab>
          </TabList>
          <TabPanels className="mt-6">
            {/* "World" Tab Panel */}
            <TabPanel className="p-6">
              <h2 className="text-2xl font-bold mb-4">For you.</h2>
              {allBlogs.length === 0 ? (
                <p className="text-gray-600">No blogs available.</p>
              ) : (
                allBlogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    userName={blog.createdBy.name}
                    title={blog.title}
                    imageUrl={blog.image}
                    content={blog.description}
                    blogId={blog._id}
                  />
                ))
              )}
            </TabPanel>

            {/* "Your Blogs" Tab Panel */}
            <TabPanel className="p-6 ">
              <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
              {myBlogs.length === 0 ? (
                <p className="text-gray-600">You have no blogs yet. Start creating!</p> 
              ) : (
                myBlogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    userName={blog.createdBy.name}
                    title={blog.title}
                    imageUrl={blog.image}
                    content={blog.description}
                    blogId={blog._id}
                    onUpdate={handleUpdate}
                    isAuthor={true}
                  />
                ))
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Home;