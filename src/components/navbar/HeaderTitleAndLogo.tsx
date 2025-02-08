import React from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../redux/reducers/generalSlice";
import { useAppDispatch } from "../../redux/store";

const HeaderTitleAndLogo: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const toggleSidebarDispatcher = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <button
        className="lg:hidden text-gray-800 dark:text-white"
        onClick={toggleSidebarDispatcher}
      >
        <FiMenu size={24} />{" "}
      </button>

      <nav className="flex  space-x-6">
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive
              ? "text-lg text-blue-600 dark:text-blue-400 font-semibold"
              : "text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }
        >
          News
        </NavLink>

        <NavLink
          to="/nyt"
          className={({ isActive }) =>
            isActive
              ? "text-lg text-blue-600 dark:text-blue-400 font-semibold"
              : "text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }
        >
          New York Times
        </NavLink>

        <NavLink
          to="/bbc-news"
          className={({ isActive }) =>
            isActive
              ? "text-lg text-blue-600 dark:text-blue-400 font-semibold"
              : "text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }
        >
          BBC News
        </NavLink>
      </nav>
    </>
  );
};

export default HeaderTitleAndLogo;
