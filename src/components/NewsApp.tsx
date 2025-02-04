import { DarkModeContext } from "context/DarkModeContext";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import ArticleContent from "./ArticleContent";
import Categories from "./Categories";
import Navbar from "./Navbar";
import SourcesSection from "./SourcesSection";
import TrendingArticles from "./TrendingArticles";

export default function NewsApp({
  query,
  articles,
  status,
  setQuery,
  setCategory,
  fetchNewsAsync,
}: any) {
  const [searchText, setSearchText] = useState(query);
  const context = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For toggling sidebar on mobile

  const { categories, category }: any = useAppSelector(
    (state: any) => state.news
  );

  // Extract sources from articles and ensure they are unique
  const sources = Array.from(
    new Set(articles.map((article: any) => article.source.name))
  );

  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const filteredArticles = selectedSources.length
    ? articles.filter((article: any) =>
        selectedSources.includes(article.source.name)
      )
    : articles;

  if (!context) {
    throw new Error("DarkModeToggle must be used within a DarkModeProvider");
  }

  const { darkMode, toggleDarkMode } = context;

  useEffect(() => {
    const handler = debounce(() => {
      setQuery(searchText);
    }, 500);

    handler();
    return () => handler.cancel();
  }, [searchText, setQuery, fetchNewsAsync]);

  // Reset selected sources when category changes
  useEffect(() => {
    setSelectedSources([]); // Reset sources when the category changes
  }, [category]);

  // Handle source selection change (checkbox)
  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const source = event.target.value;
    setSelectedSources((prevSelectedSources) =>
      prevSelectedSources.includes(source)
        ? prevSelectedSources.filter((item) => item !== source)
        : [...prevSelectedSources, source]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        {/* Left Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-black dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0`}
        >
          {/* Categories Section */}
          <div>
            <h2 className="text-lg font-semibold mb-6">Categories</h2>
            <Categories
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
          </div>

          {/* Sources Section */}
          <SourcesSection
            sources={sources}
            selectedSources={selectedSources}
            handleSourceChange={handleSourceChange}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchText={searchText}
            setSearchText={setSearchText}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar on mobile
          />
          <div className="p-6">
            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="sm:col-span-2 lg:col-span-3 order-2 lg:order-none">
                <ArticleContent articles={filteredArticles} status={status} />
              </div>
              {/* Trending Articles (should be on top on mobile) */}
              <div className="sm:col-span-2 lg:col-span-1 order-1 lg:order-none h-auto sm:h-screen lg:sticky lg:top-0">
                <TrendingArticles articles={filteredArticles} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
