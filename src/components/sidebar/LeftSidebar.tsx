import React from "react";
import Categories from "../filters/Categories";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CollapsibleFilter from "../filters/CollapsibleFilter";
import {
  toggleArticlesExpanded,
  toggleSourcesExpanded,
} from "../../redux/reducers/newsSlice";
import SearchAndThemeToggle from "../common/SearchAndThemeToggle";
import { setStartDate, setEndDate } from "../../redux/reducers/generalSlice";
import DatePicker from "../common/DatePicker";

const LeftSidebar: React.FC<any> = ({
  handleSearch,
  handleSourceChange,
  handleAuthorChange,
  searchTerm,
}) => {
  const dispatch = useAppDispatch();
  const { isSourcesExpanded, isArticlesExpanded }: any = useAppSelector(
    (state: any) => state.news
  );
  const { isCategory }: any = useAppSelector((state: any) => state.general);
  const {
    selectedAuthors,
    selectedSources,
    authorsFilterList,
    sourcesFilterList,
    endDate,
    startDate,
  }: any = useAppSelector((state: any) => state.general);
  const toggleFilterSources = () => {
    dispatch(toggleSourcesExpanded());
  };

  const toggleFilterArticles = () => {
    dispatch(toggleArticlesExpanded());
  };

  const handleDateChange = (
    date: Date | null,
    type: "startDate" | "endDate"
  ) => {
    if (type === "startDate" && date) {
      dispatch(setStartDate(date.toISOString().split("T")[0]));
    } else if (type === "endDate" && date) {
      dispatch(setEndDate(date.toISOString().split("T")[0]));
    }
  };

  return (
    <div className="w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto">
      <SearchAndThemeToggle
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        classes={`lg:hidden flex`}
      />
      {isCategory && <Categories />}
      <CollapsibleFilter
        title="Select News Source(s)"
        items={sourcesFilterList}
        selectedItems={selectedSources}
        handleItemChange={handleSourceChange}
        toggleExpand={toggleFilterSources}
        isExpanded={isSourcesExpanded}
      />
      <CollapsibleFilter
        title="Select Author(s)"
        items={authorsFilterList}
        selectedItems={selectedAuthors}
        handleItemChange={handleAuthorChange}
        toggleExpand={toggleFilterArticles}
        isExpanded={isArticlesExpanded}
      />
      {/* Date Filter */}
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};

export default LeftSidebar;
