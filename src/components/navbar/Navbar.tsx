import React from "react";
import SearchAndThemeToggle from "./SearchAndThemeToggle";
import HeaderTitleAndLogo from "./HeaderTitleAndLogo";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  searchText,
  setSearchText,
  toggleSidebar,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 mb-8 flex items-center justify-between">
      <HeaderTitleAndLogo toggleSidebar={toggleSidebar} />

      <SearchAndThemeToggle
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </header>
  );
};

export default Navbar;
