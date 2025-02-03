// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import NewsApp from "components/NewsApp";
import { debounce } from "lodash";
import { fetchNews, setCategory, setQuery } from "./redux/reducers/newsSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, category, query, status }: any = useAppSelector(
    (state: RootState) => state.news
  );
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

  return (
    <NewsApp
      articles={articles}
      category={category}
      query={query}
      status={status}
      setQuery={handleSearch}
      setCategory={(category: string) => dispatch(setCategory(category))}
      fetchNewsAsync={fetchNewsAsync}
    />
  );
};

export default App;
