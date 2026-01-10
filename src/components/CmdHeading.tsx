import { cn } from '@/lib/utils';

type AlignKeyword = 'left' | 'center' | 'right';
type AlignType = AlignKeyword | `${AlignKeyword} ${AlignKeyword}`;

interface CmdHeadingProps {
  heading: string;
  cli?: string;
  align?: AlignType;
  children?: React.ReactNode,
}

export function CmdHeading({
  heading,
  cli,
  align = 'left left',
  children
}: CmdHeadingProps) {
  const hashId = heading.replace(' ', '-').toLowerCase();

  const justifyMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const alignKeys = align.split(' ') as AlignKeyword[];
  if (alignKeys.length < 2) alignKeys.push('left'); // resolve shorthands with default left

  const [headerKey, cliKey] = alignKeys;
  const [headerClass, cliJustify] = [headerKey, cliKey].map(key => justifyMap[key]);

  const cliMargin =
    (cliKey === 'left') ? '-ml-0.5' :
      (cliKey === 'right') ? '-mr-0.5'
        : '';

  return (
    <section
      id={hashId}
      className="scroll-mt-20"
    >
      <div className={cn('flex', headerClass)}>
        <div>
          {cli &&
            <samp
              aria-hidden
              className={cn(
                'flex items-center gap-[.198rem] -mb-1 tracking-[-0.075em] select-none',
                cliJustify,
                cliMargin,
              )}
            >
              <span
                className="font-inter text-xs dark:font-light
                text-gt-900/40 dark:text-gt-50/15
                scale-y-130 scale-x-65"
              >
                &gt;
              </span>
              <p
                className="font-dankmono text-sm
                text-gt-700/70 dark:text-gt-200/35
                [word-spacing:-1.618px]"
              >
                {cli}
              </p>
            </samp>
          }
          <h2 className="font-neuvetica text-3xl text-foreground/90 leading-none tracking-[.0125em] [word-spacing:-0.075rem]">
            {heading}
          </h2>
        </div>
      </div>

      {children &&
        <div className="mt-4 text-content-900/90 dark:text-content-400/90">
          {children}
        </div>
      }
    </section>
  );
}