import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  key: string;
  title: string;
}

export interface GeneralState {
  categories: Category[];
  darkMode: boolean;
  isCategory: boolean;
  category: string;
  sidebarOpen: boolean;
  selectedAuthors: string[];
  selectedSources: string[];
  sourcesFilterList: string[];
  authorsFilterList: string[];
  startDate: string | null;
  endDate: string | null;
}

const initialState: GeneralState = {
  categories: [
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
  ],
  selectedAuthors: [],
  selectedSources: [],
  authorsFilterList: [],
  sourcesFilterList: [],
  startDate: null,
  endDate: null,
  darkMode: false,
  isCategory: true,
  category: "",
  sidebarOpen: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCategory: (state: GeneralState, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    toggleDarkMode: (state: GeneralState) => {
      state.darkMode = !state.darkMode;
    },
    setIsCategory: (state: GeneralState, action: PayloadAction<boolean>) => {
      state.isCategory = action.payload;
    },
    updateCategories: (
      state: GeneralState,
      action: PayloadAction<Category[]>
    ) => {
      state.categories = action.payload;
    },
    toggleSidebar: (state: GeneralState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedAuthors: (
      state: GeneralState,
      action: PayloadAction<string[]>
    ) => {
      state.selectedAuthors = action.payload;
    },
    setSelectedSources: (
      state: GeneralState,
      action: PayloadAction<string[]>
    ) => {
      state.selectedSources = action.payload;
    },
    updateAuthorsAndSources: (
      state: GeneralState,
      action: PayloadAction<{
        articles: {
          author?: any;
          source: { name: string };
        }[];
      }>
    ) => {
      const articles = action.payload.articles;

      const authors: any = Array?.from(
        new Set(
          articles
            .map((article: any) => article.author)
            .filter((author: string) => author)
        )
      );

      const sources = Array.from(
        new Set(articles?.map((article) => article.source.name))
      );

      state.authorsFilterList = authors;
      state.sourcesFilterList = sources;
    },
    setStartDate: (state: GeneralState, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state: GeneralState, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetDates: (state: GeneralState) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const {
  toggleDarkMode,
  setIsCategory,
  updateCategories,
  setCategory,
  toggleSidebar,
  setSelectedAuthors,
  setSelectedSources,
  updateAuthorsAndSources,
  setStartDate,
  setEndDate,
  resetDates,
} = generalSlice.actions;
export default generalSlice.reducer;
