import { LogoIcon } from '@/components/LogoIcon';
import { cn } from '@/lib/utils';

//------------------------------------------------------------

interface TechFlexProps {
  stack: string[];
  iconClass?: string;
}

//------------------------------------------------------------

export function TechFlex({ stack, iconClass }: TechFlexProps) {
  return (
    <section className="flex flex-row items-center group mt-2 gap-3 mx-auto">
      {stack.map((tech, idx) =>
        <div
          key={idx}
          className="flex items-center text-start
          text-foreground group-hover:cursor-pointer"
        >
          <LogoIcon
            name={tech.toLowerCase()}
            className={cn('size-6', iconClass)}
          />
          <span
            className="overflow-x-hidden whitespace-nowrap max-w-0
            transition-[max-width,padding-left] duration-200 ease-in-out
            group-hover:max-w-md group-hover:pl-1
            text-xs font-semibold group-hover:text-content/90 dark:group-hover:text-content-300"
          >
            {tech}
          </span>
        </div>
      )}
    </section>
  );
}
