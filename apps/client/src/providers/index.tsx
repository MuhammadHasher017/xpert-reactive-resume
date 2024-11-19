import { TooltipProvider } from "@reactive-resume/ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import { queryClient } from "../libs/query-client";
import { LocaleProvider } from "./locale";
import { ThemeProvider } from "./theme";

export const Providers = () => (
  <LocaleProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </LocaleProvider>
);
