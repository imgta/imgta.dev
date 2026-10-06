import type { EventData } from "@/types/umami";

/** Records a custom event; a no-op when the tracker script didn't load. */
export function track(event: string, data?: EventData) {
  // the tracker's send() catches its own errors, so nothing can reject here
  void window.umami?.track(event, data);
}
