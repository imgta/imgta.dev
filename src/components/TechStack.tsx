import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { LogoIcon } from '@/components/LogoIcon';
import { TECHS } from '@/lib/tech';
import { cn } from '@/lib/utils';

//------------------------------------------------------------

interface TechItem {
  key: keyof typeof TECHS;
  tags: string[];
};

const STACK: TechItem[] = [
  { key: 'react', tags: ['react'] },
  { key: 'nextjs', tags: ['react', 'nextjs'] },
  { key: 'vuejs', tags: ['vuejs'] },
  { key: 'nuxt', tags: ['vuejs', 'nuxt'] },
  { key: 'vite', tags: ['vite'] },
  { key: 'python', tags: ['python', 'django', 'fastapi', 'streamlit'] },
  { key: 'fastapi', tags: ['fastapi'] },
  { key: 'django', tags: ['django'] },
  { key: 'streamlit', tags: ['streamlit'] },
  { key: 'docker', tags: ['docker'] },
  { key: 'javascript', tags: ['javascript', 'react', 'nextjs', 'vuejs', 'nuxt', 'vite'] },
  { key: 'typescript', tags: ['typescript', 'javascript', 'react', 'nextjs', 'vuejs', 'nuxt', 'vite'] },
  { key: 'tailwindcss', tags: ['tailwindcss'] },
  { key: 'html', tags: ['html', 'django'] },
  { key: 'css', tags: ['css', 'html', 'tailwindcss'] },
];

function mapTagBitPosition(techs: TechItem[]) {
  const tagMap = new Map<string, number>();

  let idx = 0;
  for (const tech of techs) {
    for (const tag of tech.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, idx++);
    }
  }
  return tagMap;
}

function computeBitmasks(techs: TechItem[], tagIndex: Map<string, number>) {
  return techs.map(tech => {
    let mask = 0;
    // for each tag, compute the bit flag and set its bit on in the bitmask
    for (const tag of tech.tags) {
      const bitPos = tagIndex.get(tag);
      if (bitPos !== undefined) {
        const bitFlag = 1 << bitPos;
        mask |= bitFlag;
      }
    }
    // techs with zero bitmasks (no tags) are given high-order fallbacks to ensure self-relation
    if (mask === 0) mask = 1 << 30;
    return { ...tech, mask };
  });
}

const tagIndices = mapTagBitPosition(STACK);
const techBitmasks = computeBitmasks(STACK, tagIndices);

//------------------------------------------------------------

export function TechStack() {
  const [hoverMask, setHoverMask] = useState<number>(0);

  function updateBitmask(e: React.SyntheticEvent<HTMLElement>) {
    const el = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-id]');
    const mask = el ? Number(el.dataset.mask) : 0;
    if (!Number.isNaN(mask)) setHoverMask(mask);
  }

  function clearBitmask(e: React.SyntheticEvent<HTMLElement>) {
    const ul = e.currentTarget as HTMLElement;
    if (!ul.contains((e as any).relatedTarget)) setHoverMask(0);
  }

  return (
    <ul
      role="list" aria-labelledby="skills"
      className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 sm:gap-y-8 sm:gap-x-4 xl:gap-x-8"
      onMouseOver={updateBitmask}
      onMouseOut={clearBitmask}
      onFocus={updateBitmask}
      onBlur={clearBitmask}
    >
      {techBitmasks.map(({ key, mask }) => {
        const tech = TECHS[key];
        if (!tech) return null;

        const active = hoverMask !== 0 && (mask & hoverMask) !== 0;
        const dim = hoverMask !== 0 && !active;

        return (
          <li key={tech.name} className="space-y-2">
            <Link
              title={tech.name}
              to={tech.to}
              target="_blank" rel="noopener noreferrer"
              aria-label={`Visit the official ${tech.name} website`}
              data-id={tech.name}
              data-mask={mask}
              className={cn(
                'flex justify-center my-1.5 transition-[transform,opacity] duration-200 ease-in-out',
                {
                  'scale-110': active,
                  'opacity-25': dim,
                }
              )}
            >
              <LogoIcon name={tech.name} className="size-9" />
            </Link>

            <p className="block truncate text-center pointer-events-none text-xs sm:text-sm text-foreground dark:text-content-400/90">
              {tech.name}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
