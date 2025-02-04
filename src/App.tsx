import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import NewsApp from "components/NewsApp";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";
import {
  fetchNews,
  fetchSources,
  setCategory,
  setQuery,
} from "./redux/reducers/newsSlice";
import { DarkModeProvider } from "context/DarkModeContext";
import { capitalizeFirstLetter } from "helpers/utils";
import { Page } from "enums/page.enum";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Fetch sources when the component mounts
  useEffect(() => {}, [dispatch]);

  const { articles, category, query, status }: any = useAppSelector(
    (state: RootState) => state.news
  );
  const [searchTerm, setSearchTerm] = useState(query);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fetchNewsAsync = () => {
    dispatch(fetchNews({ country: "us", category, query }));
  };

  useEffect(() => {
    fetchNewsAsync();
  }, [category, query, dispatch]);

  const debouncedSetQuery = useCallback(
    debounce((value: string) => dispatch(setQuery(value)), 500),
    [dispatch]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSetQuery(value);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <DarkModeProvider>
      <Helmet>
        <title>
          {category
            ? `${capitalizeFirstLetter(category)} - ${Page.AppName}`
            : Page.AppName}
        </title>
      </Helmet>
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
