import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi"; // Chevron icons for expanding/collapsing
import Categories from "./Categories";
import SourcesSection from "./SourcesSection";
import { useAppSelector } from "../redux/store";

import React from "react";
import CollapsibleFilter from "./filters/CollapsibleFilter";

interface LeftSidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  sources: any[];
  selectedSources: string[];
  setCategory: any;
  handleSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  authors: any[];
  selectedAuthors: string[];
  handleAuthorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleExpandSource: () => void; // Add this to handle source section expand/collapse
  toggleExpandArticle: () => void; // Add this to handle article section expand/collapse
  isSourcesExpanded: boolean;
  isArticlesExpanded: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  darkMode,
  toggleDarkMode,
  searchText,
  setSearchText,
  sources,
  selectedSources,
  setCategory,
  handleSourceChange,
  authors,
  selectedAuthors,
  handleAuthorChange,
  toggleExpandSource,
  toggleExpandArticle,
  isArticlesExpanded,
  isSourcesExpanded,
}) => {
  const { categories, category }: any = useAppSelector(
    (state: any) => state.news
  );

  return (
    <div className="w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto">
      {/* Dark Mode and Search Bar on Left Sidebar */}
      <div className="flex items-center mb-4 justify-between lg:hidden space-x-4">
        {/* Dark Mode Toggle */}
        <DarkModeSwitch
          checked={darkMode}
          sunColor="#FFCC00"
          moonColor="#A9B4C2"
          onChange={toggleDarkMode}
          size={30}
        />

        {/* Search Bar */}
        <div className="relative">
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

      {/* Categories Section */}
      <div className="pr-4">
        <Categories
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Sources Section */}
      <CollapsibleFilter
        title="Select News Source(s)"
        items={sources}
        selectedItems={selectedSources}
        handleItemChange={handleSourceChange}
        toggleExpand={toggleExpandSource}
        isExpanded={isSourcesExpanded}
      />

      {/* Authors Section */}
      <CollapsibleFilter
        title="Select Author(s)"
        items={authors}
        selectedItems={selectedAuthors}
        handleItemChange={handleAuthorChange}
        toggleExpand={toggleExpandArticle}
        isExpanded={isArticlesExpanded}
      />
    </div>
  );
};

export default LeftSidebar;
