// redux/newsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "807108fb6acf434c9411606ae7acbc46";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

interface Article {
  source: { name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsState {
  articles: Article[];
  category: string;
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NewsState = {
  articles: [],
  category: "technology",
  query: "",
  status: "idle",
};

// Async thunk to fetch news
export const fetchNews = createAsyncThunk<
  Article[],
  { country?: string; category: string; query: string }
>("news/fetchNews", async ({ country, category, query }) => {
  const response = await axios.get(BASE_URL, {
    params: {
      country,
      category,
      q: query,
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCategory, setQuery } = newsSlice.actions;
export default newsSlice.reducer;
