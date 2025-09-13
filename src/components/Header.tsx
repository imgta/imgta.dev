interface HeaderProps {
  heading: string;
  cli?: string;
  children?: React.ReactNode,
}

export function Header({ cli, heading, children }: HeaderProps) {
  const anchorId = heading.replace(' ', '-');
  return (
    <div id={anchorId} className="scroll-mt-[6.5rem]">
      {cli && (
        <div className="flex gap-1 items-center text-gt-600/70 dark:text-content-400/30 tracking-[-0.075em] -ml-0.5">
          <span className="font-inter text-xs scale-y-125 scale-x-75">&gt;</span>
          <p className="font-dankmono text-sm">{cli}</p>
        </div>
      )}
      <h2 className="font-neuvetica text-3xl text-foreground/90 dark:text-gt-600 leading-none">
        {heading}
      </h2>

      {children &&
        <div className="mt-4 text-muted-foreground text-pretty">{children}</div>
      }
    </div>
  );
}