import useArticleFilter from "../hooks/useNewsArticleFilter";
import Layout from "./layout/Layout";
import ArticleContent from "./common/ArticleContent";
import TrendingArticles from "./common/TrendingArticles";

export default function NewsApp() {
  const {
    filteredArticles,
    handleSearch,
    searchTerm,
    handleAuthorChange,
    handleSourceChange,
    status,
  } = useArticleFilter();

  return (
    <Layout
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      handleSourceChange={handleSourceChange}
      handleAuthorChange={handleAuthorChange}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="sm:col-span-2 lg:col-span-3 order-2 lg:order-none">
          <ArticleContent articles={filteredArticles} status={status} />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 order-1 lg:order-none h-auto lg:sticky lg:top-0">
          <TrendingArticles articles={filteredArticles} status={status} />
        </div>
      </div>
    </Layout>
  );
}
