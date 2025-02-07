import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Chevron icons for expanding/collapsing

interface SourcesSectionProps {
  sources: any;
  selectedSources: string[];
  handleSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleExpandSource: any;
  isSourcesExpanded: boolean;
}

const SourcesSection: React.FC<SourcesSectionProps> = ({
  sources,
  selectedSources,
  handleSourceChange,
  toggleExpandSource,
  isSourcesExpanded,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4  flex items-center">
        <button
          onClick={toggleExpandSource} // Toggle the expand/collapse of the Sources section
          className=" dark:text-gray-300 flex items-center space-x-2"
        >
          Select Source(s)
          {isSourcesExpanded ? (
            <FiChevronUp className="text-gray-600 dark:text-gray-400" />
          ) : (
            <FiChevronDown className="text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </h3>
      {isSourcesExpanded && (
        <div className="flex flex-col space-y-2">
          {sources.map((source: string) => (
            <div key={source} className="flex items-center">
              <input
                type="checkbox"
                id={source}
                value={source}
                checked={selectedSources.includes(source)}
                onChange={handleSourceChange}
                className="mr-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
              />
              <label
                htmlFor={source}
                className="text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                {source}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourcesSection;
