import { useAppSelector, useAppDispatch, RootState } from "../redux/store";
import {
  fetchNYTArticles,
  setQuery,
} from "../redux/reducers/newYorkTimesSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GeneralState,
  resetDates,
  setIsCategory,
  setSelectedAuthors,
  setSelectedSources,
  updateAuthorsAndSources,
  updateCategories,
} from "../redux/reducers/generalSlice";
import { debounce } from "lodash";

interface Article {
  source: string;
  byline: {
    original: string | null;
  };
  pub_date?: string;
  multimedia?: { url: string }[];
  abstract?: string;
  headline?: {
    main: string;
  };
  urlToImage?: string;
  title?: string;
  description?: string;
}

interface NewYorkTimesState {
  articles: Article[];
  status: "loading" | "succeeded" | "failed" | string;
  query: string;
}

const useNewYorkTimesArticleFilter = () => {
  const dispatch = useAppDispatch();
  const { articles, status, query }: NewYorkTimesState = useAppSelector(
    (state: { newYorkTimes: any }) => state.newYorkTimes
  );

  const {
    category,
    selectedSources,
    selectedAuthors,
    startDate,
    endDate,
  }: GeneralState = useAppSelector((state: RootState) => state.general);

  const setSelectedAuthorsHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedAuthors(payload)),
    [dispatch]
  );

  const setSelectedSourcesHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedSources(payload)),
    [dispatch]
  );

  const updateCategory = () => {
    dispatch(updateCategories([]));
  };

  const [searchTerm, setSearchTerm] = useState(query);

  const fetchNewsAsync = useCallback(() => {
    dispatch(fetchNYTArticles({ category, query }));
    dispatch(setIsCategory(false));
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

  const filteredArticles = articles
    ?.filter((article: Article) =>
      selectedSources?.length
        ? selectedSources?.includes(article?.source)
        : true
    )
    .filter((article: Article) =>
      selectedAuthors?.length
        ? selectedAuthors.includes(article.byline?.original ?? "")
        : true
    )
    .filter((article: Article) => {
      if (startDate && article.pub_date) {
        const articleDate = new Date(article.pub_date);
        const start = new Date(startDate);
        if (articleDate < start) {
          return false;
        }
      }
      if (endDate && article.pub_date) {
        const articleDate = new Date(article.pub_date);
        const end = new Date(endDate);
        if (articleDate > end) {
          return false;
        }
      }
      return true;
    });

  const mappedArticles = articles?.map((article: Article) => ({
    ...article,
    source: { name: article.source || "Unknown" },
    author: article.byline || "Unknown",
  }));

  const updatedArticles = filteredArticles?.map((article: any) => {
    const imageUrl =
      process.env.REACT_APP_API_UR + article?.multimedia?.[0]?.url;
    const description = article?.abstract;

    return {
      ...article,
      title: article?.headline?.main,
      description,
      urlToImage: imageUrl || article?.urlToImage,
    };
  });

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

  const resetDatesHandler = () => {
    dispatch(resetDates());
  };

  useEffect(() => {
    setSelectedSourcesHandler([]);
    setSelectedAuthorsHandler([]);
    dispatch(updateAuthorsAndSources({ articles: mappedArticles }));
    updateCategory();
    resetDatesHandler();
  }, [
    setSelectedAuthorsHandler,
    setSelectedSourcesHandler,
    articles,
    category,
  ]);

  return {
    category,
    handleSearch,
    handleSourceChange,
    handleAuthorChange,
    searchTerm,
    status,
    updatedArticles,
  };
};

export default useNewYorkTimesArticleFilter;
