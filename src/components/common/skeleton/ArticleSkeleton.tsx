import React from "react";

interface ArticleSkeletonProps {
  index: number;
}

const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ index }) => {
  return (
    <div
      key={index}
      className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse"
    >
      <div className="w-full h-48 bg-gray-300 rounded-md"></div>
      <div className="mt-3">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
