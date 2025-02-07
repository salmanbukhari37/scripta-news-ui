import { useCallback, useEffect, useMemo, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import useNewYorkTimesArticleFilter from "../hooks/useNewYorkTimesArticleFilter";
import Layout from "./layout/Layout";
import ArticleContent from "./common/ArticleContent";
import TrendingArticles from "./common/TrendingArticles";
import { IAppThemeState } from "dto/interfaces";
import { setQuery } from "../redux/reducers/newsSlice";
import { debounce } from "lodash";
import { fetchNYTArticles } from "../redux/reducers/newYorkTimesSlice";

export default function NewYorkTimes() {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedSources, selectedAuthors, status, query }: any =
    useAppSelector((state: any) => state.newYorkTimes);

  const { category }: any = useAppSelector((state: any) => state.general);

  const { darkMode }: IAppThemeState = useAppSelector(
    (state: RootState) => state.theme
  );

  const [searchTerm, setSearchTerm] = useState(query);

  const fetchNewYorkTimesAsync = useCallback(() => {
    dispatch(fetchNYTArticles({ query, category }));
  }, [dispatch, category, query]);

  useEffect(() => {
    fetchNewYorkTimesAsync();
  }, [fetchNewYorkTimesAsync]);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => dispatch(setQuery(value)), 500),
    [dispatch]
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSetQuery(value);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
  }, [darkMode]);

  const {
    authors,
    sources,
    setSelectedSourcesHandler,
    setSelectedAuthorsHandler,
    filteredArticles,
  } = useNewYorkTimesArticleFilter();

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

  const updatedArticles = filteredArticles?.map((article: any) => {
    const imageUrl = article?.media?.[0]?.["media-metadata"]?.[2]?.url;
    const description = article?.abstract;

    return {
      ...article,
      description,
      urlToImage: imageUrl || article?.urlToImage,
    };
  });

  return (
    <Layout
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      sources={sources}
      authors={authors}
      sidebarOpen={sidebarOpen}
      toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      handleSourceChange={handleSourceChange}
      handleAuthorChange={handleAuthorChange}
      selectedAuthors={selectedAuthors}
      selectedSources={selectedSources}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="sm:col-span-2 lg:col-span-3 order-2 lg:order-none">
          <ArticleContent articles={updatedArticles} status={status} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 order-1 lg:order-none h-auto sm:h-screen lg:sticky lg:top-0">
          <TrendingArticles articles={updatedArticles} status={status} />
        </div>
      </div>
    </Layout>
  );
}
