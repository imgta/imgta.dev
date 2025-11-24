import { cn } from "@/lib/utils";

type AlignKeyword = 'left' | 'center' | 'right';
type AlignType = AlignKeyword | `${AlignKeyword} ${AlignKeyword}`;

interface HeaderProps {
  heading: string;
  cli?: string;
  align?: AlignType;
  children?: React.ReactNode,
}

export function Header({
  heading,
  cli,
  align = 'left left',
  children
}: HeaderProps) {
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
      (cliKey === 'right') ? '-mr-0.5' : '';

  return (
    <section
      id={hashId}
      className="scroll-mt-26"
    >
      <div className={cn('flex', headerClass)}>
        <div>
          {cli &&
            <samp
              className={cn(
                'flex items-center gap-1 -mb-1 select-none text-gt-700/50 dark:text-gt-50/30 tracking-[-0.075em]', cliJustify,
                cliMargin,
              )}
            >
              <span className="font-inter text-content-800/25 dark:text-gt-500/55 text-xs scale-y-125 scale-x-75">&gt;</span>
              <p className="font-dankmono text-sm">{cli}</p>
            </samp>
          }
          <h2 className="font-neuvetica text-3xl text-foreground/90 leading-none">
            {heading}
          </h2>
        </div>
      </div>

      {children &&
        <div className="mt-4 text-content-900/90 dark:text-content-400/90">{children}</div>
      }
    </section>
  );
}