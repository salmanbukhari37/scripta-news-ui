export interface INewsAppState {
  selectedSources: string[];
  selectedAuthors: string[];
  status: "loading" | "succeeded" | "failed";
}

export interface INewsAppProps {
  handleSearch: (searchTerm: string) => void;
  searchTerm: string;
}
