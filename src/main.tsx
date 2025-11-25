import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // auto-generated route tree
import { hydrateRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const queryClient = new QueryClient(); // init tanstack query client

// create type-safe tanstack router instance
const router = createRouter({
  routeTree,
  scrollRestoration: true,
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

hydrateRoot(document,
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
