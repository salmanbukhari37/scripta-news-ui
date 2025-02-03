import React from "react";

interface LeftNavigationProps {
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  categories,
  category,
  setCategory,
}) => {
  return (
    <aside className="w-64 h-screen p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto sticky top-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Categories
      </h2>
      <nav className="space-y-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat.toLowerCase())}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              category === cat.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default LeftNavigation;
