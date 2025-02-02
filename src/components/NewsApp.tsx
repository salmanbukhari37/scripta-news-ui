import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const categories = ["Technology", "Business", "Sports", "Health", "Science"];

export default function NewsApp({
  query,
  category,
  articles,
  status,
  dispatch,
  setQuery,
  setCategory,
  fetchNews,
}: any) {
  const [searchText, setSearchText] = useState(query);

  // Debounce the query update
  useEffect(() => {
    const handler = debounce(() => {
      dispatch(setQuery(searchText));
    }, 500);

    handler();
    return () => handler.cancel();
  }, [searchText, dispatch, setQuery]);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
        📰 News App
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative w-full sm:w-2/3">
          <FiSearch className="absolute left-4 top-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            className="border p-3 pl-10 w-full rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Local state update
          />
        </div>
        <button
          onClick={() =>
            dispatch(fetchNews({ country: "us", category, query }))
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Search
        </button>
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setCategory(cat.toLowerCase()))}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat.toLowerCase()
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {status === "loading" && (
          <p className="text-center text-lg">Loading...</p>
        )}
        {status === "failed" && (
          <p className="text-center text-lg text-red-500">
            Failed to load news. Try again later.
          </p>
        )}
        {status === "succeeded" &&
          articles.map((article: any, index: number) => (
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
    </div>
  );
}
