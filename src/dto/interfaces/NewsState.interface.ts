import { Article } from "./Article.interface";
import { Source } from "./Source.interface";

export interface NewsState {
  categories: string[];
  articles: Article[];
  category: string;
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  sources: Source[];
  sourcesStatus: "idle" | "loading" | "succeeded" | "failed";
  selectedSource: string;
  isSourcesExpanded: boolean;
  isArticlesExpanded: boolean;
  selectedSources: string[];
  selectedAuthors: string[];
}
