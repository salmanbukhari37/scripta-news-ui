import { debounce } from "lodash";
import { useEffect, useState } from "react";
import {
  setSelectedAuthors,
  setSelectedSources,
} from "../redux/reducers/newsSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import ArticleContent from "./ArticleContent";
import LeftSidebar from "./LeftSidebar";
import Navbar from "./navbar/Navbar";
import TrendingArticles from "./TrendingArticles";

export default function NewsApp({
  query,
  setQuery,
  darkMode,
  setCategory,
  fetchNewsAsync,
  toggleDarkMode,
}: any) {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(query);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { category, selectedSources, selectedAuthors, status, articles }: any =
    useAppSelector((state: any) => state.news);

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

  const setSelectedAuthorsHandler = (payload: any) => {
    dispatch(setSelectedAuthors(payload));
  };

  const setSelectedSourcesHandler = (payload: any) => {
    dispatch(setSelectedSources(payload));
  };

  const filteredArticles = articles
    .filter((article: any) =>
      selectedSources.length
        ? selectedSources.includes(article.source.name)
        : true
    )
    .filter((article: any) =>
      selectedAuthors.length ? selectedAuthors.includes(article.author) : true
    );

  useEffect(() => {
    const handler = debounce(() => {
      setQuery(searchText);
    }, 500);

    handler();
    return () => handler.cancel();
  }, [searchText, setQuery, fetchNewsAsync]);

  useEffect(() => {
    setSelectedSourcesHandler([]);
    setSelectedAuthorsHandler([]);
  }, [category]);

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const source = event.target.value;
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((item: any) => item !== source)
      : [...selectedSources, source];
    setSelectedSourcesHandler(updatedSources);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const author = event.target.value;
    const updatedAuthors = selectedAuthors.includes(author)
      ? selectedAuthors.filter((item: any) => item !== author)
      : [...selectedAuthors, author];
    setSelectedAuthorsHandler(updatedAuthors);
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
            handleSourceChange={handleSourceChange}
            authors={authors}
            handleAuthorChange={handleAuthorChange}
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
