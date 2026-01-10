import { useState } from 'react';
import { IconSvg } from '@/components/IconSvg';
import { TECHS, type TechKey } from '@/lib/tech';
import { cn } from '@/lib/utils';

interface TechItem {
  key: TechKey;
  tags: string[];
};

const STACK: TechItem[] = [
  { key: 'react', tags: ['react', 'nextjs'] },
  { key: 'nextjs', tags: ['nextjs'] },
  { key: 'vuejs', tags: ['vuejs', 'nuxt'] },
  { key: 'nuxt', tags: ['nuxt'] },
  { key: 'vite', tags: ['vite', 'react', 'vuejs', 'nuxt'] },
  { key: 'python', tags: ['python', 'django', 'fastapi', 'streamlit'] },
  { key: 'fastapi', tags: ['fastapi'] },
  { key: 'django', tags: ['django'] },
  { key: 'streamlit', tags: ['streamlit'] },
  { key: 'docker', tags: ['docker'] },
  { key: 'javascript', tags: ['javascript', 'react', 'nextjs', 'vuejs', 'nuxt', 'vite'] },
  { key: 'typescript', tags: ['typescript', 'react', 'nextjs', 'vuejs', 'nuxt', 'vite'] },
  { key: 'tailwindcss', tags: ['tailwindcss'] },
  { key: 'html', tags: ['html'] },
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
const techBitmasks: (TechItem & { mask: number; })[] = computeBitmasks(STACK, tagIndices);

//------------------------------------------------------------

export function TechStack() {
  const [hoverMask, setHoverMask] = useState<number>(0);

  function handleBlur(e: React.FocusEvent<HTMLUListElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHoverMask(0); // clear bitmask only when focus moves outside of <ul>
    }
  }

  return (
    <ul
      role="list"
      aria-labelledby="skills"
      className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 sm:gap-y-8 sm:gap-x-4 xl:gap-x-8"
      onMouseLeave={() => setHoverMask(0)}
      onBlur={handleBlur}
    >
      {techBitmasks.map(({ key, mask }) => {
        const tech = TECHS[key];
        if (!tech) return null;

        const { name, href } = tech;

        const active = !!(mask & hoverMask);
        const dim = !!hoverMask && !active;

        return (
          <li
            key={name}
            className="space-y-2"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the official ${name} website`}
              title={name}
              href={href}
              onMouseEnter={() => setHoverMask(mask)}
              onFocus={() => setHoverMask(mask)}
              className={cn(
                'flex justify-center my-1.5 transition-[opacity,filter] duration-150 ease-in-out',
                {
                  'opacity-25 grayscale-50': dim,
                  'scale-110': active,
                }
              )}
            >
              <IconSvg
                className="size-9"
                name={name}
              />
            </a>

            <p className="block truncate text-center pointer-events-none text-xs sm:text-sm text-foreground dark:text-content-400/90">
              {name}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

//------------------------------------------------------------

interface TechFlexProps {
  stack: string[];
  iconClass?: string;
}

export function TechFlex({
  stack,
  iconClass = '',
}: TechFlexProps) {
  return (
    <section className="flex flex-row items-center mx-auto gap-1 sm:gap-2">
      {stack.map(name => {
        const key = name
          .replace(/^aws\s+/i, '')  // strip leading 'AWS'
          .replace(/[\s.]+/g, '')   // strip whitespace, periods
          .toLowerCase();

        const tech = TECHS[key];
        if (!tech) return null;

        const href = tech.href ?? '#';

        return (
          <a
            key={key}
            href={href}
            title={name}
            target='_blank'
            rel="noopener noreferrer"
            className="group flex hover:cursor-pointer"
          >
            <IconSvg
              name={name}
              className={cn(
                'size-7 group-hover:saturate-110 group-hover:brightness-110 transition-[filter]',
                iconClass,
              )}
            />
            <span
              className="max-w-0 overflow-x-hidden h-full my-auto whitespace-nowrap [word-spacing:-0.05rem]
              font-neuvetica font-semibold text-sm text-foreground/80 tracking-[.0125em] lowercase
              group-hover:max-w-md group-hover:px-1.5 group-hover:-mr-1 group-hover:-translate-y-1
              group-hover:underline underline-offset-1
              transition-[max-width,padding-left,translate] duration-200 ease-in-out"
            >
              {name}
            </span>
          </a>
        );
      })}
    </section>
  );
}
