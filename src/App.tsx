// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store"; // adjust the path if needed
import NewsApp from "components/NewsApp";
import { debounce } from "lodash";
import { fetchNews, setCategory, setQuery } from "./redux/reducers/newsSlice";

const App: React.FC = () => {
  const randomPicture = "https://picsum.photos/200/300";
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch
  const { articles, category, query, status }: any = useAppSelector(
    (state: RootState) => state.news
  );
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    dispatch(fetchNews({ country: "us", category, query }));
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
      {...{ articles, category, query, status, dispatch }}
      setQuery={handleSearch}
      setCategory={setCategory}
    />
  );
};

export default App;
