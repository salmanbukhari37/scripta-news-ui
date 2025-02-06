import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiSearch } from "react-icons/fi";

interface GenericControlsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchAndThemeToggle: React.FC<GenericControlsProps> = ({
  darkMode,
  toggleDarkMode,
  searchText,
  setSearchText,
}) => {
  return (
    <div className="hidden lg:flex items-center space-x-4">
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
  );
};

export default SearchAndThemeToggle;
