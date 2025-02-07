import React from "react";
import HeaderTitleAndLogo from "./HeaderTitleAndLogo";
import SearchAndThemeToggle from "../../components/common/SearchAndThemeToggle";

interface NavbarProps {
  toggleSidebar: () => void;
  handleSearch: () => void;
  searchTerm: string;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  handleSearch,
  searchTerm,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 mb-8 flex items-center justify-between">
      <HeaderTitleAndLogo toggleSidebar={toggleSidebar} />
      <SearchAndThemeToggle
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        classes={`hidden lg:flex`}
      />
    </header>
  );
};

export default React.memo(Navbar);
