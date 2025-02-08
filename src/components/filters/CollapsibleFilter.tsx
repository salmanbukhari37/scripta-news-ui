import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface CollapsibleFilterProps {
  title: string;
  items: any[]; // Array of either sources or authors
  selectedItems: string[];
  handleItemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleExpand: () => void;
  isExpanded: boolean;
}

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({
  title,
  items,
  selectedItems,
  handleItemChange,
  toggleExpand,
  isExpanded,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <button
          onClick={toggleExpand}
          className="dark:text-gray-300 flex items-center space-x-2"
        >
          {title}
          {isExpanded ? (
            <FiChevronUp className="text-gray-600 dark:text-gray-400" />
          ) : (
            <FiChevronDown className="text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </h3>
      {isExpanded && (
        <div className="flex flex-col space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                id={item}
                value={item}
                checked={selectedItems?.includes(item)}
                onChange={handleItemChange}
                className="mr-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
              />
              <label
                htmlFor={item}
                className="text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleFilter;
