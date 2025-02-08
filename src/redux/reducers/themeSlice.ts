import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
  isCategory: boolean;
}

const initialState: ThemeState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  isCategory: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state: ThemeState) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());
    },
    setIsCategory: (state: ThemeState, action) => {
      state.isCategory = action.payload;
    },
  },
});

export const { toggleDarkMode, setIsCategory } = themeSlice.actions;
export default themeSlice.reducer;
