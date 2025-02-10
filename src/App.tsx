import React, { useEffect } from "react";
import { RootState, useAppSelector } from "./redux/store";
import { IAppThemeState } from "dto/interfaces";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";

const App: React.FC = () => {
  const { darkMode }: IAppThemeState = useAppSelector(
    (state: RootState) => state.theme
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
