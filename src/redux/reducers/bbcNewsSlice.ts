import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IArticle, NewsState } from "dto/interfaces";

const API_KEY = "daa583cfc99e4292ad001a99e6762d16";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = createAsyncThunk<
  IArticle[],
  { country?: string; category: string; query: string; source?: string }
>("news/fetchNews", async ({ query, source }: any) => {
  const response = await axios.get(
    `${BASE_URL}/top-headlines?sources=bbc-news`,
    {
      params: {
        q: query,
        sources: source,
        apiKey: API_KEY,
      },
    }
  );
  return response.data.articles;
});

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
  name: "bbcNews",
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
