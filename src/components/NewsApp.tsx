import { DarkModeContext } from "context/DarkModeContext";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ArticleContent from "./ArticleContent";
import LeftNavigation from "./LeftNavigation";
import Navbar from "./Navbar";
import TrendingArticles from "./TrendingArticles";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const categories = ["Technology", "Business", "Sports", "Health", "Science"];

export default function NewsApp({
  query,
  category,
  articles,
  status,
  setQuery,
  setCategory,
  fetchNewsAsync,
}: any) {
  const [searchText, setSearchText] = useState(query);
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("DarkModeToggle must be used within a DarkModeProvider");
  }

  const { darkMode, toggleDarkMode } = context;

  // Debounce the query update
  useEffect(() => {
    const handler = debounce(() => {
      setQuery(searchText);
    }, 500);

    handler();
    return () => handler.cancel();
  }, [searchText, setQuery, fetchNewsAsync]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      {/* <Navbar /> */}
      <LeftNavigation
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
          📰 News App
        </h1>

        {/* Theme Toggle Button */}

        <div className="absolute top-6 right-6  items-center space-x-4">
          <div className="flex">
            {/* Toggle Button */}
            <DarkModeSwitch
              style={{ marginBottom: "2rem" }}
              checked={!darkMode}
              sunColor="#FFCC00"
              moonColor="#A9B4C2"
              onChange={toggleDarkMode}
              size={30}
            />
            {/* Search Bar */}
            <div className="">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="border p-3 pl-10 w-full rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <FiSearch className="absolute left-4 top-3 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Content Section */}
          <div className="lg:col-span-3">
            <ArticleContent articles={articles} status={status} />
          </div>

          {/* Trending Articles Section */}
          <div className="lg:col-span-1 sticky top-0 h-screen">
            <TrendingArticles articles={articles} />
          </div>
        </div>
      </main>
    </div>
  );
}
