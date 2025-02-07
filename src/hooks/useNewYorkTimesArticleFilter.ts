import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  setSelectedAuthors,
  setSelectedSources,
} from "../redux/reducers/newYorkTimesSlice";
import { useCallback, useEffect } from "react";
import { setCategory, updateCategories } from "../redux/reducers/generalSlice";

interface Article {
  source: string;
  author: string | null;
  urlToImage?: string;
  title?: string;
  url?: string;
}

interface NewsState {
  selectedSources: string[];
  selectedAuthors: string[];
  articles: Article[];
  category: string;
}

const useNewYorkTimesArticleFilter = () => {
  const dispatch = useAppDispatch();
  const { selectedSources, selectedAuthors, articles, category }: any =
    useAppSelector((state: { newYorkTimes: any }) => state.newYorkTimes);

  const setSelectedAuthorsHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedAuthors(payload)),
    [dispatch]
  );

  const setSelectedSourcesHandler = useCallback(
    (payload: string[]) => dispatch(setSelectedSources(payload)),
    [dispatch]
  );

  const updateCategory = () => {
    dispatch(
      updateCategories([
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
      ])
    );
  };

  const setCategoryValue = () => {
    dispatch(setCategory("day_of_week"));
  };

  useEffect(() => {
    updateCategory();
    setCategoryValue();
  }, []);

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
    );

  const authors = Array?.from(
    new Set(
      articles
        ?.map((article: any) => article.byline)
        .filter((author: any) => author)
    )
  );

  const sources = Array?.from(
    new Set(articles?.map((article: any) => article.source))
  );

  useEffect(() => {
    setSelectedSourcesHandler([]);
    setSelectedAuthorsHandler([]);
  }, [category, setSelectedAuthorsHandler, setSelectedSourcesHandler]);

  return {
    authors,
    sources,
    filteredArticles,
    setSelectedAuthorsHandler,
    setSelectedSourcesHandler,
  };
};

export default useNewYorkTimesArticleFilter;
