import { Link } from '@tanstack/react-router';
import { LogoIcon } from '@/components/LogoIcon';
import { cn } from '@/lib/utils';
import { TECHS } from '@/lib/tech';

//------------------------------------------------------------

interface TechFlexProps {
  stack: string[];
  iconClass?: string;
}

//------------------------------------------------------------

export function TechFlex({ stack, iconClass }: TechFlexProps) {
  return (
    <section className="flex flex-row items-center mt-2 mx-auto gap-2">
      {stack.map((name, idx) => {
        const key = name
          .replace(/^aws\s+/i, '')  // strip leading 'AWS'
          .replace(/[\s.]+/g, '')   // remove whitespace, periods
          .toLowerCase();

        const tech = TECHS[key];
        const href = tech ? tech.to : '#';

        return (
          <Link
            key={idx}
            to={href}
            title={name}
            target='_blank' rel="noopener noreferrer"
            className="group flex hover:cursor-pointer"
          >

            <LogoIcon name={name} className={cn('size-7', iconClass)} />

            <span
              className="max-w-0 overflow-x-hidden h-full my-auto whitespace-nowrap
              text-sm font-sfmono tracking-tighter font-normal
              text-foreground dark:group-hover:text-content-300
              group-hover:max-w-md group-hover:text-content/90 group-hover:pl-1
              transition-[max-width,padding-left] duration-150 ease-in-out"
            >
              {name}
            </span>
          </Link>
        );
      }
      )}
    </section>
  );
}
