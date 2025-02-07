import React from "react";

const TrendingArticlesSkeleton = () => {
  return (
    <aside className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md sticky top-0 z-10">
      <h2 className="text-lg font-semibold mb-4">
        <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
      </h2>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-start gap-4 animate-pulse">
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          <div className="flex-1">
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default TrendingArticlesSkeleton;
