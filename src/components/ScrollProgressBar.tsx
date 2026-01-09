import { useEffect, useRef } from 'react';

export function ScrollProgressBar() {
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const roundedRef = useRef<boolean>(true);

  useEffect(() => {
    const progressEl = progressRef.current;
    const barEl = barRef.current;
    if (!progressEl || !barEl) return;

    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    const update = () => {
      rafRef.current = null;

      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      const scrollMax = (doc.scrollHeight || 0) - window.innerHeight;

      const progress = scrollMax > 0 ? clamp01(scrollTop / scrollMax) : 0;
      barEl.style.width = `${progress * 100}%`;

      // remove round border radius from tail end at ~100% progress
      const roundEnd = progress < 0.999;
      if (roundEnd !== roundedRef.current) {
        roundedRef.current = roundEnd;
        barEl.classList.toggle('rounded-r-full', roundEnd);
      }

      progressEl.value = progress; // update semantic/a11y html
    };

    const onScrollOrResize = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update(); // initial paint

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener('scroll', onScrollOrResize, { signal, passive: true });
    window.addEventListener('resize', onScrollOrResize, { signal, passive: true });

    return () => {
      controller.abort();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-0.5 z-20">
      <progress
        ref={progressRef}
        max={1}
        value={0}
        aria-label="Page scroll progress"
        className="sr-only"
      />
      <div
        ref={barRef}
        aria-hidden="true"
        style={{ width: '0%' }}
        className="animate-[bar-gradient_3s_linear_infinite_alternative-reverse]
        bg-[linear-gradient(to_right_in_oklch,var(--bar-1),var(--bar-2),var(--bar-3))]
        motion-reduce:animate-none will-change-[width] h-full rounded-r-full
        transition-[width] duration-500 ease-out"
      />
    </div>
  );
}