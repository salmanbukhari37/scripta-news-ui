import React from "react";

interface SourcesSectionProps {
  sources: any;
  selectedSources: string[];
  handleSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SourcesSection: React.FC<SourcesSectionProps> = ({
  sources,
  selectedSources,
  handleSourceChange,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select News Source(s)</h3>
      <div className="flex flex-col space-y-2">
        {sources.map((source: string) => (
          <div key={source} className="flex items-center">
            <input
              type="checkbox"
              id={source}
              value={source}
              checked={selectedSources.includes(source)}
              onChange={handleSourceChange}
              className="mr-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <label
              htmlFor={source}
              className="text-gray-800 dark:text-gray-200"
            >
              {source}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesSection;
