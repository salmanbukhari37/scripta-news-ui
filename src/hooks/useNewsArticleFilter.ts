import { useAppSelector, useAppDispatch } from "../redux/store";
import {
  setSelectedAuthors,
  setSelectedSources,
} from "../redux/reducers/newsSlice";
import { useCallback, useEffect } from "react";
import { updateCategories, setCategory } from "../redux/reducers/generalSlice";

interface Article {
  source: {
    name: string;
  };
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

const useNewsArticleFilter = () => {
  const dispatch = useAppDispatch();
  const { selectedSources, selectedAuthors, articles, category }: NewsState =
    useAppSelector((state: { news: NewsState }) => state.news);

  const updateCategory = () => {
    dispatch(
      updateCategories([
        {
          key: "technology",
          title: "Technology",
        },
        {
          key: "business",
          title: "Business",
        },
        {
          key: "sports",
          title: "Sports",
        },
        {
          key: "health",
          title: "Health",
        },
        {
          key: "science",
          title: "Science",
        },
      ])
    );
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
    );

  const authors = Array.from(
    new Set(
      articles.map((article) => article.author).filter((author) => author)
    )
  );

  const sources = Array.from(
    new Set(articles.map((article) => article.source.name))
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

export default useNewsArticleFilter;
