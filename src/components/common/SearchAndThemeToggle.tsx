import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiSearch } from "react-icons/fi";
import { toggleDarkMode } from "../../redux/reducers/themeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const SearchAndThemeToggle: React.FC<any> = ({
  handleSearch,
  searchTerm,
  classes,
}) => {
  const dispatch = useAppDispatch();
  const { darkMode }: any = useAppSelector((state: any) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <div className={`${classes} items-center mb-4 justify-between space-x-4`}>
        <DarkModeSwitch
          checked={darkMode}
          sunColor="#FFCC00"
          moonColor="#A9B4C2"
          onChange={handleToggleTheme}
          size={30}
        />

        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            className="border p-3 pl-12 pr-4 w-full rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 shadow-md"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </>
  );
};

export default React.memo(SearchAndThemeToggle);
