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
  darkMode: false,
  isCategory: true,
  category: "",
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
  },
});

export const { toggleDarkMode, setIsCategory, updateCategories, setCategory } =
  generalSlice.actions;
export default generalSlice.reducer;
