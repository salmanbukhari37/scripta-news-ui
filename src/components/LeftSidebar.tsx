import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiSearch } from "react-icons/fi";
import Categories from "./Categories";
import { useAppDispatch, useAppSelector } from "../redux/store";

import React from "react";
import CollapsibleFilter from "./filters/CollapsibleFilter";
import {
  toggleArticlesExpanded,
  toggleSourcesExpanded,
} from "../redux/reducers/newsSlice";
import { ILeftSidebar } from "dto/interfaces";

const LeftSidebar: React.FC<ILeftSidebar> = ({
  darkMode,
  toggleDarkMode,
  searchText,
  setSearchText,
  sources,
  setCategory,
  handleSourceChange,
  authors,
  handleAuthorChange,
}) => {
  const dispatch = useAppDispatch();

  const {
    categories,
    category,
    isSourcesExpanded,
    isArticlesExpanded,
    selectedSources,
    selectedAuthors,
  }: any = useAppSelector((state: any) => state.news);

  return (
    <div className="w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto">
      <div className="flex items-center mb-4 justify-between lg:hidden space-x-4">
        <DarkModeSwitch
          checked={darkMode}
          sunColor="#FFCC00"
          moonColor="#A9B4C2"
          onChange={toggleDarkMode}
          size={30}
        />

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

      <div className="pr-4">
        <Categories
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <CollapsibleFilter
        title="Select News Source(s)"
        items={sources}
        selectedItems={selectedSources}
        handleItemChange={handleSourceChange}
        toggleExpand={() => dispatch(toggleSourcesExpanded())} // Dispatch action to toggle
        isExpanded={isSourcesExpanded}
      />

      <CollapsibleFilter
        title="Select Author(s)"
        items={authors}
        selectedItems={selectedAuthors}
        handleItemChange={handleAuthorChange}
        toggleExpand={() => dispatch(toggleArticlesExpanded())} // Dispatch action to toggle
        isExpanded={isArticlesExpanded}
      />
    </div>
  );
};

export default LeftSidebar;
