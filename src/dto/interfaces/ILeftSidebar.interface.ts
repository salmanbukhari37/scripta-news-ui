export interface ILeftSidebar {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  sources: any[];
  setCategory: any;
  authors: any[];
  handleSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
