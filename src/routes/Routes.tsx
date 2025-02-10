import React from "react";
const NewsApp = React.lazy(() => import("../components/NewsApp"));
const NewYorkTimes = React.lazy(() => import("../components/NewYorkTimes"));
const BBCNews = React.lazy(() => import("../components/BbcNews"));
const NotFound = React.lazy(() => import("../components/NotFound"));

export const routes = [
  { path: "/news", element: <NewsApp /> },
  { path: "/nyt", element: <NewYorkTimes /> },
  { path: "/bbc-news", element: <BBCNews /> },
  { path: "*", element: <NotFound /> },
];
