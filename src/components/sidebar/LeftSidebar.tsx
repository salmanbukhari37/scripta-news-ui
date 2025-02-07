import React from "react";
import Categories from "../filters/Categories";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CollapsibleFilter from "../filters/CollapsibleFilter";
import {
  toggleArticlesExpanded,
  toggleSourcesExpanded,
} from "../../redux/reducers/newsSlice";
import SearchAndThemeToggle from "../common/SearchAndThemeToggle";

const LeftSidebar: React.FC<any> = ({
  handleSearch,
  sources,
  handleSourceChange,
  authors,
  handleAuthorChange,
  searchTerm,
  selectedSources,
  selectedAuthors,
}) => {
  const dispatch = useAppDispatch();

  const { isSourcesExpanded, isArticlesExpanded }: any = useAppSelector(
    (state: any) => state.news
  );

  const { isCategory }: any = useAppSelector((state: any) => state.theme);

  return (
    <div className="w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto shadow-[4px_0_8px_0_rgba(0,0,0,0.1)] dark:shadow-[4px_0_8px_0_rgba(255,255,255,0.2)]">
      <SearchAndThemeToggle
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        classes={`lg:hidden flex`}
      />
      {isCategory && <Categories />}
      <CollapsibleFilter
        title="Select News Source(s)"
        items={sources}
        selectedItems={selectedSources}
        handleItemChange={handleSourceChange}
        toggleExpand={() => dispatch(toggleSourcesExpanded())}
        isExpanded={isSourcesExpanded}
      />
      <CollapsibleFilter
        title="Select Author(s)"
        items={authors}
        selectedItems={selectedAuthors}
        handleItemChange={handleAuthorChange}
        toggleExpand={() => dispatch(toggleArticlesExpanded())}
        isExpanded={isArticlesExpanded}
      />
    </div>
  );
};

export default LeftSidebar;
