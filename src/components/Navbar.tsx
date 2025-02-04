import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiSearch } from "react-icons/fi";
import newsPaper from "../assets/newspaper.png";
import { Page } from "enums/page.enum";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  toggleSidebar: () => void; // Added this prop to toggle the sidebar
}

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  searchText,
  setSearchText,
  toggleSidebar, // Destructure toggleSidebar from props
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 mb-8 flex items-center justify-between">
      {/* Hamburger Icon (visible on mobile) */}
      <button
        className="lg:hidden text-gray-800 dark:text-white"
        onClick={toggleSidebar} // Toggle sidebar visibility on click
      >
        ☰
      </button>

      {/* Logo and Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 flex items-center space-x-4">
        <img
          src={newsPaper}
          alt="News App Logo"
          className="w-12 h-12 object-contain"
        />
        <span className="hidden lg:block text-2xl font-bold text-gray-800 dark:text-gray-200">
          News App
        </span>
      </h1>

      {/* Controls (Dark Mode, Search) */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <DarkModeSwitch
          checked={darkMode}
          sunColor="#FFCC00"
          moonColor="#A9B4C2"
          onChange={toggleDarkMode}
          size={30}
        />

        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search news..."
            className="border p-3 pl-12 pr-4 w-full rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 shadow-md"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
