import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";

import { ArtboardPage } from "../pages/artboard";
import { BuilderLayout } from "../pages/builder";
import { Providers } from "../providers";

export const routes = createRoutesFromChildren(
  <Route element={<Providers />}>
    <Route path="artboard" element={<ArtboardPage />}>
      <Route path="builder" element={<BuilderLayout />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
