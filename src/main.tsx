import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

//----------------------------------------------------------------------

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // import generated route tree

const router = createRouter({ routeTree }); // create tanstack router instance
declare module '@tanstack/react-router' {   // register type-safe router instance
  interface Register { router: typeof router; }
}

const queryClient = new QueryClient(); // initialize tanstack query client

//----------------------------------------------------------------------

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);