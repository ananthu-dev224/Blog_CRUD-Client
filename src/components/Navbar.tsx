import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/reducers/userSlice";
import { TfiWrite } from "react-icons/tfi";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

// Navbar Component
const Navbar: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm to Logout",
      message: "Are you sure want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            dispatch(userLogout());
            navigate("/")
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  return (
    <nav className="flex justify-between items-center bg-gray-200 p-4 m-2 rounded-md text-gray-700">
      {/* Blogger Logo */}
      <div className="text-2xl font-bold text-gray-800">Blogger.online</div>

      {/* Create Icon and User Info */}
      <div className="flex items-center space-x-4">
        {/* Create Icon */}
        <div
          className="cursor-pointer text-gray-600 hover:text-gray-700 mr-3 flex items-center space-x-2"
          onClick={() => navigate("/blog")}
        >
          <TfiWrite className="text-2xl" />
          <span>Create Blog</span>
        </div>

        {/* User Info (Name & Email) */}
        <div className="flex flex-col text-right">
          <span className="font-semibold text-gray-700">
            {user?.name || "Name"}
          </span>
          <span className="text-sm text-gray-500">{user?.email || "Email"}</span>
        </div>
        <div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-gray-400 font-semibold text-white p-2 rounded-full hover:bg-gray-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
