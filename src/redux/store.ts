import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import newsReducer from "./reducers/newsSlice";
import themeReducer from "./reducers/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import newYorkTimesSlice from "./reducers/newYorkTimesSlice";
import generalReducer from "./reducers/generalSlice";
import bbcNewsReducer from "./reducers/bbcNewsSlice";

export const store = configureStore({
  reducer: {
    bbcNews: bbcNewsReducer,
    general: generalReducer,
    newYorkTimes: newYorkTimesSlice,
    news: newsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector<RootState>;
