import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import NewsApp from "components/NewsApp";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";
import { fetchNews, setCategory, setQuery } from "./redux/reducers/newsSlice";
import { capitalizeFirstLetter } from "helpers/utils";
import { Page } from "./dto/enums/page.enum";
import { toggleDarkMode } from "./redux/reducers/themeSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { category, query }: any = useAppSelector(
    (state: RootState) => state.news
  );

  const { darkMode }: any = useAppSelector((state: RootState) => state.theme);
  const [searchTerm, setSearchTerm] = useState(query);

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

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Helmet>
        <title>
          {category
            ? `${capitalizeFirstLetter(category)} - ${Page.AppName}`
            : Page.AppName}
        </title>
      </Helmet>
      <NewsApp
        query={query}
        darkMode={darkMode}
        setQuery={handleSearch}
        toggleDarkMode={handleToggleDarkMode}
        setCategory={(category: string) => dispatch(setCategory(category))}
        fetchNewsAsync={fetchNewsAsync}
      />
    </>
  );
};

export default App;
