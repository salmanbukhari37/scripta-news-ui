import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchNews, setQuery } from "../redux/reducers/newsSlice";
import {
  GeneralState,
  resetDates,
  setSelectedAuthors,
  setSelectedSources,
  updateAuthorsAndSources,
} from "../redux/reducers/generalSlice";
import {
  updateCategories,
  setCategory,
  setIsCategory,
} from "../redux/reducers/generalSlice";
import { debounce } from "lodash";

interface Article {
  source: {
    name: string;
  };
  author: string | null;
  urlToImage?: string;
  title?: string;
  url?: string;
  publishedAt?: string;
}

interface NewsState {
  selectedSources: string[];
  selectedAuthors: string[];
  articles: Article[];
  category: string;
  query: string;
  status: "loading" | "succeeded" | "failed" | string;
}

interface Category {
  key: string;
  title: string;
}

const useNewsArticleFilter = () => {
  const dispatch = useAppDispatch();
  const categories: Category[] = [
    { key: "technology", title: "Technology" },
    { key: "business", title: "Business" },
    { key: "sports", title: "Sports" },
    { key: "health", title: "Health" },
    { key: "science", title: "Science" },
  ];

  const { articles, query, status }: NewsState = useAppSelector(
    (state: { news: NewsState }) => state.news
  );

  const {
    category,
    selectedSources,
    selectedAuthors,
    startDate,
    endDate,
  }: GeneralState = useAppSelector(
    (state: { general: GeneralState }) => state.general
  );

  const [searchTerm, setSearchTerm] = useState(query);

  const fetchNewsAsync = useCallback(() => {
    dispatch(fetchNews({ country: "us", category, query }));
    dispatch(setIsCategory(true));
  }, [dispatch, category, query]);

  useEffect(() => {
    fetchNewsAsync();
  }, [fetchNewsAsync]);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => dispatch(setQuery(value)), 500),
    [dispatch]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSetQuery(value);
  };

  const updateCategory = () => {
    dispatch(updateCategories(categories));
  };

  const setCategoryValue = () => {
    dispatch(setCategory("technology"));
  };

  useEffect(() => {
    updateCategory();
    setCategoryValue();
  }, []);

  const setSelectedAuthorsHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedAuthors(payload)),
    [dispatch]
  );

  const setSelectedSourcesHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedSources(payload)),
    [dispatch]
  );

  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const source = event.target.value;
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((item: string) => item !== source)
      : [...selectedSources, source];
    setSelectedSourcesHandler(updatedSources);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const author = event.target.value;
    const updatedAuthors = selectedAuthors.includes(author)
      ? selectedAuthors.filter((item: string) => item !== author)
      : [...selectedAuthors, author];
    setSelectedAuthorsHandler(updatedAuthors);
  };

  const filteredArticles = articles
    .filter((article) =>
      selectedSources.length
        ? selectedSources.includes(article.source.name)
        : true
    )
    .filter((article) =>
      selectedAuthors.length
        ? selectedAuthors.includes(article.author ?? "")
        : true
    )
    .filter((article: Article) => {
      if (startDate && article.publishedAt) {
        const articleDate = new Date(article.publishedAt);
        const start = new Date(startDate);
        if (articleDate < start) {
          return false;
        }
      }
      if (endDate && article.publishedAt) {
        const articleDate = new Date(article.publishedAt);
        const end = new Date(endDate);
        if (articleDate > end) {
          return false;
        }
      }
      return true;
    });

  const resetDatesHandler = () => {
    dispatch(resetDates());
  };

  useEffect(() => {
    setSelectedSourcesHandler([]);
    setSelectedAuthorsHandler([]);
    dispatch(updateAuthorsAndSources({ articles }));
    resetDatesHandler();
  }, [setSelectedAuthorsHandler, setSelectedSourcesHandler, articles]);

  return {
    filteredArticles,
    handleSearch,
    handleSourceChange,
    handleAuthorChange,
    searchTerm,
    status,
    category,
  };
};

export default useNewsArticleFilter;
