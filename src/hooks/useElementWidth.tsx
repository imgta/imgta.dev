import { useState, useRef, useLayoutEffect, useMemo, type RefObject } from 'react';
import { debounce } from '@/utils/misc';

export function useElementWidth(): [RefObject<HTMLElement | null>, number] {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);

  const debouncedSetWidth = useMemo(() =>
    debounce((newWidth: number) =>
      setWidth(newWidth)),
    []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onResize = (entries: ResizeObserverEntry[]) => {
      const { width } = entries[0]?.contentRect ?? node.getBoundingClientRect();
      debouncedSetWidth(width);
    };

    const resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(node);

    setWidth(node.getBoundingClientRect().width);

    return () => {
      resizeObs.unobserve(node);
      resizeObs.disconnect();
    };
  }, [debouncedSetWidth]);

  return [ref, width];
}
