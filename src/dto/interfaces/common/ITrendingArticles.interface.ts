interface Article {
  urlToImage?: string;
  title?: string;
  url?: string;
}

export interface ITrendingArticles {
  articles: Article[];
  status: "loading" | "failed" | "succeeded";
}
