import React from "react";
import { FiMenu } from "react-icons/fi";
import newsPaper from "../../assets/newspaper.png";
import { Page } from "dto/enums/page.enum";

interface HeaderTitleAndLogoProps {
  toggleSidebar: () => void;
}

const HeaderTitleAndLogo: React.FC<HeaderTitleAndLogoProps> = ({
  toggleSidebar,
}) => {
  return (
    <>
      <button
        className="lg:hidden text-gray-800 dark:text-white"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />{" "}
      </button>

      <h1 className="hidden lg:flex text-4xl font-extrabold text-gray-800 dark:text-gray-200 items-center space-x-4">
        <img
          src={newsPaper}
          alt="News App Logo"
          className="w-12 h-12 object-contain"
        />
        <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {Page.AppName}
        </span>
      </h1>
    </>
  );
};

export default HeaderTitleAndLogo;
