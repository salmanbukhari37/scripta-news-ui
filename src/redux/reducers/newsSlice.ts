import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Article, NewsState, Source } from "dto/interfaces";

const API_KEY = "807108fb6acf434c9411606ae7acbc46";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = createAsyncThunk<
  Article[],
  { country?: string; category: string; query: string; source?: string }
>("news/fetchNews", async ({ country, category, query, source }: any) => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country,
      category,
      q: query,
      sources: source,
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
});

export const fetchSources = createAsyncThunk<Source[], string>(
  "news/fetchSources",
  async (country: string) => {
    const response = await axios.get(`${BASE_URL}/top-headlines/sources`, {
      params: {
        country,
        apiKey: API_KEY,
      },
    });
    return response.data.sources;
  }
);

const initialState: NewsState = {
  categories: ["Technology", "Business", "Sports", "Health", "Science"],
  articles: [],
  selectedSources: [],
  selectedAuthors: [],
  sources: [],
  category: "technology",
  query: "",
  status: "idle",
  sourcesStatus: "idle",
  selectedSource: "",
  isSourcesExpanded: true,
  isArticlesExpanded: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCategory: (state: NewsState, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setQuery: (state: NewsState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedSource: (state: NewsState, action: PayloadAction<string>) => {
      state.selectedSource = action.payload;
    },
    toggleSourcesExpanded: (state: NewsState) => {
      state.isSourcesExpanded = !state.isSourcesExpanded;
      state.isArticlesExpanded = !state.isSourcesExpanded;
    },
    toggleArticlesExpanded: (state: NewsState) => {
      state.isArticlesExpanded = !state.isArticlesExpanded;
      state.isSourcesExpanded = !state.isArticlesExpanded;
    },
    setSelectedSources: (state: NewsState, action: PayloadAction<string[]>) => {
      state.selectedSources = action.payload;
    },
    setSelectedAuthors: (state: NewsState, action: PayloadAction<string[]>) => {
      state.selectedAuthors = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchNews.pending, (state: NewsState) => {
        state.status = "loading";
      })
      .addCase(
        fetchNews.fulfilled,
        (state: NewsState, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.articles = action.payload;
        }
      )
      .addCase(fetchNews.rejected, (state: NewsState) => {
        state.status = "failed";
      });

    builder
      .addCase(fetchSources.pending, (state: NewsState) => {
        state.sourcesStatus = "loading";
      })
      .addCase(
        fetchSources.fulfilled,
        (state: NewsState, action: PayloadAction<any>) => {
          state.sourcesStatus = "succeeded";
          state.sources = action.payload;
        }
      )
      .addCase(fetchSources.rejected, (state: NewsState) => {
        state.sourcesStatus = "failed";
      });
  },
});

export const {
  setCategory,
  setQuery,
  setSelectedSource,
  toggleSourcesExpanded,
  toggleArticlesExpanded,
  setSelectedSources,
  setSelectedAuthors,
} = newsSlice.actions;
export default newsSlice.reducer;
