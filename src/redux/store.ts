import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import newsReducer from "./reducers/newsSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    news: newsReducer,
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
export const useAppSelector = useSelector<RootState>;
