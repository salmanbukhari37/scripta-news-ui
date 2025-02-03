import React, { useCallback, useContext, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import NewsApp from "components/NewsApp";
import { debounce } from "lodash";
import { fetchNews, setCategory, setQuery } from "./redux/reducers/newsSlice";
import { DarkModeContext, DarkModeProvider } from "context/DarkModeContext";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { articles, category, query, status }: any = useAppSelector(
    (state: RootState) => state.news
  );
  const [searchTerm, setSearchTerm] = useState(query);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Fetch news articles based on category and query
  const fetchNewsAsync = () => {
    dispatch(fetchNews({ country: "us", category, query }));
  };

  // Effect to fetch news when category or query changes
  useEffect(() => {
    fetchNewsAsync();
  }, [category, query, dispatch]);

  // Debounced query update
  const debouncedSetQuery = useCallback(
    debounce((value: string) => dispatch(setQuery(value)), 500),
    [dispatch]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSetQuery(value);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <DarkModeProvider>
      <NewsApp
        articles={articles}
        category={category}
        query={query}
        status={status}
        setQuery={handleSearch}
        setCategory={(category: string) => dispatch(setCategory(category))}
        fetchNewsAsync={fetchNewsAsync}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </DarkModeProvider>
  );
};

export default App;
