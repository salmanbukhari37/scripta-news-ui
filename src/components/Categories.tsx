import React from "react";

interface CategoriesProps {
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categories,
  category,
  setCategory,
}) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-6">Categories</h2>
      <div className="space-y-4 mb-8">
        {categories.map((cat) => (
          <div key={cat}>
            <button
              onClick={() => setCategory(cat.toLowerCase())}
              className={`w-full text-left px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
