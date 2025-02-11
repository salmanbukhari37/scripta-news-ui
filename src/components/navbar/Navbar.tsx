import React from "react";
import HeaderTitleAndLogo from "./HeaderTitleAndLogo";
import SearchAndThemeToggle from "../../components/common/SearchAndThemeToggle";

interface NavbarProps {
  handleSearch: () => void;
  searchTerm: string;
}

const Navbar: React.FC<NavbarProps> = ({ handleSearch, searchTerm }) => {
  return (
    <header
      data-testid="navbar"
      className="bg-white dark:bg-gray-800 shadow-md p-4 mb-8 flex items-center justify-between"
    >
      <HeaderTitleAndLogo />
      <SearchAndThemeToggle
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        classes={`hidden lg:flex`}
      />
    </header>
  );
};

export default React.memo(Navbar);
