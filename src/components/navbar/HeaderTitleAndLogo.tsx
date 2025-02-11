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

  const links = [
    { to: "/news", label: "News" },
    { to: "/nyt", label: "New York Times" },
    { to: "/bbc-news", label: "BBC News" },
  ];

  return (
    <>
      <button
        className="lg:hidden text-gray-800 dark:text-white"
        onClick={toggleSidebarDispatcher}
      >
        <FiMenu size={24} />
      </button>

      <nav className="flex space-x-2 lg:space-x-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "text-lg text-blue-600 dark:text-blue-400 font-semibold"
                : "text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default HeaderTitleAndLogo;
