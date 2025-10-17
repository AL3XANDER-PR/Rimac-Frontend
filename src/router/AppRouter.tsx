import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import PlansPage from "../pages/Plans/PlansPage";
import HomePage from "../pages/Home/HomePage";
import SummaryPage from "../pages/Summary/SummaryPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
