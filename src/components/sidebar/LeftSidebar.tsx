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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const { isCategory }: any = useAppSelector((state: any) => state.theme);
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
      dispatch(setStartDate(date.toISOString().split("T")[0])); // Convert to 'YYYY-MM-DD' format
    } else if (type === "endDate" && date) {
      dispatch(setEndDate(date.toISOString().split("T")[0])); // Convert to 'YYYY-MM-DD' format
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
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          Select Start/End Date
        </h3>
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start Date
          </label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => handleDateChange(date, "startDate")}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholderText="Select a start date"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End Date
          </label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => handleDateChange(date, "endDate")}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholderText="Select an end date"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
