// ArticleContent.tsx
import React from "react";

interface Article {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

interface ArticleContentProps {
  status: "loading" | "failed" | "succeeded";
  articles: Article[];
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  status,
  articles,
}) => {
  return (
    <section className="lg:col-span-3">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {status === "loading" && (
          <p className="text-center text-lg">Loading...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-lg text-red-500">
            Failed to load news. Try again later.
          </p>
        )}
        {status === "succeeded" &&
          articles.map((article, index) => (
            <div
              key={index}
              className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={article.urlToImage || "https://via.placeholder.com/300"}
                alt="news"
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-3">{article.title}</h2>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-3 block font-medium"
              >
                Read more →
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ArticleContent;
