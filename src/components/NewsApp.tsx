import { DarkModeContext } from "context/DarkModeContext";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import ArticleContent from "./ArticleContent";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./navbar/Navbar";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true); // Track if sources are expanded
  const [isArticlesExpanded, setIsArticlesExpanded] = useState(false); // Track if articles are expanded

  const { categories, category }: any = useAppSelector(
    (state: any) => state.news
  );

  const sources = Array.from(
    new Set(articles.map((article: any) => article.source.name))
  );
  const authors = Array.from(
    new Set(
      articles
        .map((article: any) => article.author)
        .filter((author: any) => author)
    )
  );

  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]); // New state for authors filter

  const filteredArticles = articles
    .filter((article: any) =>
      selectedSources.length
        ? selectedSources.includes(article.source.name)
        : true
    )
    .filter((article: any) =>
      selectedAuthors.length ? selectedAuthors.includes(article.author) : true
    );

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

  useEffect(() => {
    setSelectedSources([]);
    setSelectedAuthors([]);
  }, [category]);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const source = event.target.value;
    setSelectedSources((prevSelectedSources) =>
      prevSelectedSources.includes(source)
        ? prevSelectedSources.filter((item) => item !== source)
        : [...prevSelectedSources, source]
    );
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const author = event.target.value;
    setSelectedAuthors((prevSelectedAuthors) =>
      prevSelectedAuthors.includes(author)
        ? prevSelectedAuthors.filter((item) => item !== author)
        : [...prevSelectedAuthors, author]
    );
  };

  const toggleExpandSource = () => {
    setIsSourcesExpanded(!isSourcesExpanded);
    if (!isSourcesExpanded) setIsArticlesExpanded(false); // Collapse articles if sources are expanded
  };

  const toggleExpandArticle = () => {
    setIsArticlesExpanded(!isArticlesExpanded);
    if (!isArticlesExpanded) setIsSourcesExpanded(false); // Collapse sources if articles are expanded
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto`}
        >
          <LeftSidebar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchText={searchText}
            setCategory={setCategory}
            setSearchText={setSearchText}
            sources={sources}
            selectedSources={selectedSources}
            handleSourceChange={handleSourceChange}
            authors={authors}
            selectedAuthors={selectedAuthors}
            handleAuthorChange={handleAuthorChange}
            toggleExpandSource={toggleExpandSource}
            toggleExpandArticle={toggleExpandArticle}
            isSourcesExpanded={isSourcesExpanded}
            isArticlesExpanded={isArticlesExpanded}
          />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-6">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchText={searchText}
            setSearchText={setSearchText}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="sm:col-span-2 lg:col-span-3 order-2 lg:order-none">
                <ArticleContent articles={filteredArticles} status={status} />
              </div>
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
