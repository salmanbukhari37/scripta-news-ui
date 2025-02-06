import React from "react";
import SearchAndThemeToggle from "./SearchAndThemeToggle";
import HeaderTitleAndLogo from "./HeaderTitleAndLogo";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleDarkMode } from "../../redux/reducers/themeSlice";

interface NavbarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchText,
  setSearchText,
  toggleSidebar,
}) => {
  const dispatch = useAppDispatch();
  const { darkMode }: any = useAppSelector((state: any) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle theme
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 mb-8 flex items-center justify-between">
      <HeaderTitleAndLogo toggleSidebar={toggleSidebar} />

      <SearchAndThemeToggle
        darkMode={darkMode}
        toggleDarkMode={handleToggleTheme}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </header>
  );
};

export default Navbar;
