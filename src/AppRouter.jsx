import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";

import React from "react";

import MainPage from "./pages/MainPage";
import QuizzPage from "./pages/QuizzPage";
import Registration from "./pages/Registration";
import RatingTable from "./pages/RatingTable";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<MainPage />} />
      <Route path="registration" element={<Registration />} />
      <Route element={<Header />}>
        <Route path="quizz" element={<QuizzPage />} />
        <Route path="ratingtable" element={<RatingTable />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </React.Fragment>
  )
);

function AppRouter() {
  return <RouterProvider router={mainRouter} />;
}
export default AppRouter;
