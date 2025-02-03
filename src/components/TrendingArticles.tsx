import React from "react";

interface Article {
  urlToImage: string;
  title: string;
  url: string;
}

interface TrendingArticlesProps {
  articles: Article[];
}

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ articles }) => {
  return (
    <aside className="space-y-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md sticky top-0 z-10">
      <h2 className="text-lg font-semibold mb-4">Trending Articles</h2>
      {articles.slice(0, 5).map((article, index) => (
        <div key={index} className="flex items-start gap-4">
          <img
            src={article.urlToImage || "https://via.placeholder.com/100"}
            alt="thumbnail"
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="text-sm font-medium">{article.title}</h3>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default TrendingArticles;
