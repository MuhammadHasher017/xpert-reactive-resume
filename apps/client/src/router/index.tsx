import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { BuilderLayout } from "../pages/builder/layout";
import { builderLoader, BuilderPage } from "../pages/builder/page";
import NotFoundPage from "../pages/notfound/page";
import { Providers } from "../providers";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route element={<BuilderLayout />}>
      <Route index={true} loader={builderLoader} element={<BuilderPage />} />
    </Route>
    <Route path="/not-found" element={<NotFoundPage />} />
  </Route>,
);

export const router = createBrowserRouter(routes);
