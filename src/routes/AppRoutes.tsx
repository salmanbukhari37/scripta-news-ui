import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes";

const AppRoutes: React.FC = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    }
  >
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </Suspense>
);

export default AppRoutes;
