interface Article {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  source: string;
}

interface ArticleListProps {
  filteredArticles: Article[];
}
const ArticleList: React.FC<ArticleListProps> = ({ filteredArticles }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Articles</h2>
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <div key={article.id} className="p-4 border rounded-md shadow-md">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-700">{article.content}</p>
            <small className="text-sm text-gray-500">
              {article.date} - {article.category} - {article.source}
            </small>
          </div>
        ))
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default ArticleList;
