import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // auto-generated route tree
import { createRoot } from "react-dom/client";

// setup tanstack router instance with typesafety
const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "render",
  defaultPreloadStaleTime: 0,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.querySelector("#root")!;
if (!rootEl.innerHTML) {
  createRoot(rootEl).render(<RouterProvider router={router} />);
}
