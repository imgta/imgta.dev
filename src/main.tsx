import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // auto-generated route tree
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient(); // init tanstack query client

// setup tanstack router instance with typesafety
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: { queryClient },
  defaultPreload: 'render',
  defaultPreloadStaleTime: 0,
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.querySelector('#root')!;
if (!rootEl.innerHTML) {
  createRoot(rootEl).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}