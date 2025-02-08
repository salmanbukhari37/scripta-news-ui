import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IArticle, NewsState } from "dto/interfaces";

const NYT_API_KEY = "mIpBZ2EVpYw4tUiVZGwu8w6MAddAgdJM";
const NYT_BASE_URL =
  "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json";

// const NYT_BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const fetchNYTArticles = createAsyncThunk<
  IArticle[],
  { query: string; page?: number; category?: string }
>("news/fetchNYTArticles", async ({ query }: any) => {
  const response = await axios.get(NYT_BASE_URL, {
    params: {
      "api-key": NYT_API_KEY,
    },
  });
  return response.data.results;
});

// Initial state for New York Times
const initialState: NewsState = {
  articles: [],
  nytArticles: [],
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

const newYorkTimesSlice = createSlice({
  name: "newYorkTimes",
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
      .addCase(fetchNYTArticles.pending, (state: NewsState) => {
        state.status = "loading";
      })
      .addCase(
        fetchNYTArticles.fulfilled,
        (state: NewsState, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.articles = action.payload;
        }
      )
      .addCase(fetchNYTArticles.rejected, (state: NewsState) => {
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
} = newYorkTimesSlice.actions;

export default newYorkTimesSlice.reducer;
