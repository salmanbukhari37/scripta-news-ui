import React from "react";
import { RootState, useAppSelector } from "./redux/store";
import NewsApp from "components/NewsApp";
import { Helmet } from "react-helmet";
import { capitalizeFirstLetter } from "helpers/utils";
import { Page } from "./dto/enums/page.enum";
import { IAppNewsState } from "dto/interfaces";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewYorkTimes from "components/NewYorkTimes";

const App: React.FC = () => {
  const { category }: IAppNewsState = useAppSelector(
    (state: RootState) => state.news
  );

  return (
    <Router>
      <Helmet>
        <title>
          {category
            ? `${capitalizeFirstLetter(category)} - ${Page.AppName}`
            : Page.AppName}
        </title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Navigate to="/news" />} />
        <Route path="/news" element={<NewsApp />} />
        <Route path="/nyt" element={<NewYorkTimes />} />
      </Routes>
    </Router>
  );
};

export default App;
