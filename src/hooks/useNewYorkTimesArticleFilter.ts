import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  fetchNYTArticles,
  setQuery,
} from "../redux/reducers/newYorkTimesSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  resetDates,
  setCategory,
  setIsCategory,
  setSelectedAuthors,
  setSelectedSources,
  updateAuthorsAndSources,
  updateCategories,
} from "../redux/reducers/generalSlice";
import { debounce } from "lodash";

const useNewYorkTimesArticleFilter = () => {
  const dispatch = useAppDispatch();
  const categories = [
    {
      title: "Day of Week",
      key: "day_of_week",
    },
    {
      title: "Document Type",
      key: "document_type",
    },
    {
      title: "Ingredients",
      key: "ingredients",
    },
  ];

  const { articles, status, query }: any = useAppSelector(
    (state: { newYorkTimes: any }) => state.newYorkTimes
  );

  const {
    category,
    selectedSources,
    selectedAuthors,
    startDate,
    endDate,
  }: any = useAppSelector((state: any) => state.general);

  const setSelectedAuthorsHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedAuthors(payload)),
    [dispatch]
  );

  const setSelectedSourcesHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedSources(payload)),
    [dispatch]
  );

  const updateCategory = () => {
    dispatch(updateCategories(categories));
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

  const setCategoryValue = () => {
    dispatch(setCategory("day_of_week"));
  };

  const filteredArticles = articles
    ?.filter((article: any) =>
      selectedSources?.length
        ? selectedSources?.includes(article?.source)
        : true
    )
    .filter((article: any) =>
      selectedAuthors?.length
        ? selectedAuthors.includes(article.byline ?? "")
        : true
    )
    .filter((article: any) => {
      if (startDate && article.published_date) {
        const articleDate = new Date(article.published_date);
        const start = new Date(startDate);
        if (articleDate < start) {
          return false;
        }
      }
      if (endDate && article.published_date) {
        const articleDate = new Date(article.published_date);
        const end = new Date(endDate);
        if (articleDate > end) {
          return false;
        }
      }
      return true;
    });

  const mappedArticles = articles.map((article: any) => ({
    ...article,
    source: { name: article.source || "Unknown" },
    author: article.byline || "Unknown",
  }));

  const updatedArticles = filteredArticles?.map((article: any) => {
    const imageUrl = article?.media?.[0]?.["media-metadata"]?.[2]?.url;
    const description = article?.abstract;

    return {
      ...article,
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
    setCategoryValue();
    resetDatesHandler();
  }, [
    setSelectedAuthorsHandler,
    setSelectedSourcesHandler,
    articles,
    category,
  ]);

  return {
    handleSearch,
    handleSourceChange,
    handleAuthorChange,
    searchTerm,
    status,
    updatedArticles,
  };
};

export default useNewYorkTimesArticleFilter;
