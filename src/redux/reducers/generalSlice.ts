import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  key: string;
  title: string;
}

interface ThemeState {
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

const initialState: ThemeState = {
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
  name: "theme",
  initialState,
  reducers: {
    setCategory: (state: any, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    toggleDarkMode: (state: ThemeState) => {
      state.darkMode = !state.darkMode;
    },
    setIsCategory: (state: ThemeState, action) => {
      state.isCategory = action.payload;
    },
    updateCategories: (
      state: ThemeState,
      action: PayloadAction<Category[]>
    ) => {
      state.categories = action.payload;
    },
    toggleSidebar: (state: ThemeState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedAuthors: (
      state: ThemeState,
      action: PayloadAction<string[]>
    ) => {
      state.selectedAuthors = action.payload;
    },
    setSelectedSources: (
      state: ThemeState,
      action: PayloadAction<string[]>
    ) => {
      state.selectedSources = action.payload;
    },
    updateAuthorsAndSources: (
      state: ThemeState,
      action: PayloadAction<{ articles: any[] }>
    ) => {
      const articles = action.payload.articles;

      const authors = Array.from(
        new Set(
          articles.map((article) => article.author).filter((author) => author)
        )
      );

      const sources = Array.from(
        new Set(articles.map((article) => article.source.name))
      );

      state.authorsFilterList = authors;
      state.sourcesFilterList = sources;
    },
    setStartDate: (state: ThemeState, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state: ThemeState, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    resetDates: (state: ThemeState) => {
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
