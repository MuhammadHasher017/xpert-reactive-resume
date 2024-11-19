import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { BuilderLayout } from "../pages/builder/layout";
import { builderLoader, BuilderPage } from "../pages/builder/page";
import { Providers } from "../providers";

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="builder">
      <Route element={<BuilderLayout />}>
        <Route path=":id" loader={builderLoader} element={<BuilderPage />} />
      </Route>
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
