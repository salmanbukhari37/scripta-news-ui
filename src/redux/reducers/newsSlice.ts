import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "807108fb6acf434c9411606ae7acbc46";
const BASE_URL = "https://newsapi.org/v2";

// Define interfaces
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

interface Source {
  id: string;
  name: string;
}

interface NewsState {
  categories: string[];
  articles: Article[];
  category: string;
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  sources: Source[];
  sourcesStatus: "idle" | "loading" | "succeeded" | "failed";
  selectedSource: string; // New state for selected source
}

const initialState: NewsState = {
  categories: ["Technology", "Business", "Sports", "Health", "Science"],
  articles: [],
  category: "technology",
  query: "",
  status: "idle",
  sources: [],
  sourcesStatus: "idle",
  selectedSource: "", // Initialize selectedSource
};

// Fetch news articles
export const fetchNews = createAsyncThunk<
  Article[],
  { country?: string; category: string; query: string; source?: string }
>("news/fetchNews", async ({ country, category, query, source }: any) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country,
      category,
      q: query,
      sources: source, // Use the selected source as a filter
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
});

// Fetch sources
export const fetchSources = createAsyncThunk<
  Source[],
  string // country (e.g., "usa")
>("news/fetchSources", async (country: string) => {
  const response = await axios.get(`${BASE_URL}/top-headlines/sources`, {
    params: {
      country,
      apiKey: API_KEY,
    },
  });
  return response.data.sources;
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
    setSelectedSource: (state, action: PayloadAction<string>) => {
      state.selectedSource = action.payload; // Set selected source
    },
  },
  extraReducers: (builder) => {
    // Handling fetchNews (articles) states
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

    // Handling fetchSources (sources) states
    builder
      .addCase(fetchSources.pending, (state) => {
        state.sourcesStatus = "loading";
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.sourcesStatus = "succeeded";
        state.sources = action.payload;
      })
      .addCase(fetchSources.rejected, (state) => {
        state.sourcesStatus = "failed";
      });
  },
});

export const { setCategory, setQuery, setSelectedSource } = newsSlice.actions;
export default newsSlice.reducer;
