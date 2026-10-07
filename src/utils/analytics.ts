/** Records a custom event; a no-op when the tracker script didn't load. */
export function track(event: string, data?: Record<string, unknown>) {
  // the tracker's send() catches its own errors, so nothing can reject here
  void window.umami?.track(event, data);
}
