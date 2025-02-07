import React from "react";

export interface ILeftSidebar {
  sources: any[];
  authors: any[];
  handleSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAuthorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (event: React.ChangeEvent<HTMLUListElement>) => void;
  searchTerm: string;
}
