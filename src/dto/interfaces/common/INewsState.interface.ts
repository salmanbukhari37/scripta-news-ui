import { IArticle } from "./IArticle.interface";
import { ISource } from "./ISource.interface";

export interface NewsState {
  categories?: string[];
  articles: IArticle[];
  nytArticles?: any;
  category: string;
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  sources: ISource[];
  sourcesStatus: "idle" | "loading" | "succeeded" | "failed";
  selectedSource: string;
  isSourcesExpanded: boolean;
  isArticlesExpanded: boolean;
  selectedSources: string[];
  selectedAuthors: string[];
}
