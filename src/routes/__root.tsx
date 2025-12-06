import { createRootRoute, HeadContent, Link, Outlet, type LinkProps } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { IconSvg } from '@/components/IconSvg';
import { useEffect, useState } from 'react';
import { SOCIALS } from '@/utils/meta';
import { cn } from '@/lib/utils';
import '@/styles/main.css';

interface NavigationLink extends
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel' | 'title' | 'aria-label' | 'onClick'
  >,
  Pick<LinkProps, 'to' | 'hash' | 'activeProps' | 'activeOptions'> {
  name: string;
}

const navLinks: NavigationLink[] = [
  {
    name: 'Skills',
    title: 'Tech stack',
    to: '/',
    hash: 'tech-stack',
    activeOptions: { exact: true, includeHash: true }
  },
  {
    name: 'Projects',
    title: 'Projects',
    to: '/',
    hash: 'projects',
    activeOptions: { exact: true, includeHash: true }
  },
  {
    name: 'Contact',
    title: 'Contact info',
    to: '/',
    hash: 'contact-me',
    activeOptions: { exact: true, includeHash: true }
  },
  {
    name: 'Resume',
    title: 'Google Drive CV link',
    href: 'https://drive.google.com/file/d/1dVjJGAvB7cXL-IGoXp7wVcVZgG2VTxpH/view?usp=sharing',
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: () => umami.track('cv_click'),
  },
];

//------------------------------------------------------------

export const Route = createRootRoute({
  component: () => {
    const [scrollY, setScrollY] = useState<number>(0);

    useEffect(() => {
      const pageY = () => window.pageYOffset
        || (document.documentElement.scrollTop || document.body.scrollTop)
        || 0;
      const onScroll = () => setScrollY(pageY());

      const controller = new AbortController();
      const { signal } = controller;

      window.addEventListener('scroll', onScroll, { passive: true, signal });
      onScroll(); // initial on-mount scrollY

      return () => controller.abort();
    }, []);

    return (
      <>
        <HeadContent />
        <div className="min-h-screen flex flex-col">
          <header className={cn(
            'sticky inset-0 top-0 backdrop-blur-[3px] z-20',
            'bg-content-100/70 dark:bg-sidebar/90 border-b border-muted-foreground/10',
          )}>
            <nav className="max-w-5xl mx-auto p-8">
              <div className="flex items-center gap-8">

                <abbr className="hidden sm:flex sm:flex-1">
                  <Link
                    className="flex items-center text-3xl gap-2 hover:cursor-pointer group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    to="/"
                  >
                    <span className={cn(
                      'font-inter font-extralight text-xl leading-none scale-y-150',
                      'text-content-700 group-hover:text-gt-600 group-hover:font-light',
                      'dark:text-gt-500 dark:group-hover:text-gt-600',
                      scrollY < 10 ? 'grayscale-75 opacity-30' : 'group-hover:-rotate-90',
                      'transition-[rotate,scale,filter,opacity,color,font-weight] duration-200 ease-in-out',
                    )}>
                      &gt;
                    </span>
                    <p className="font-neuvetica tracking-[0.07em]">
                      <span className="marker font-light text-content-500 dark:text-content-400
                        selection:text-content-500 dark:selection:text-content-400
                        group-hover:text-content-700 dark:group-hover:text-content-250"
                      >
                        im
                      </span>
                      <span className="marker font-normal text-content-700 dark:text-gt-500
                        selection:text-content-700 dark:selection:text-gt-500
                        group-hover:text-gt-700 dark:group-hover:text-gt-600"
                      >
                        gta
                      </span>
                    </p>
                  </Link>
                </abbr>

                {navLinks.map(link =>
                  <Button
                    asChild
                    variant="link"
                    key={link.name}
                    className={cn('font-dankmono lowercase text-[.92rem] tracking-tight px-0',
                      'text-gt-900 dark:text-content-400',
                      'hover:text-gt-700 dark:hover:text-gt-600',
                      '[&.active]:pb-4 [&.active]:underline [&.active]:underline-offset-8',
                      '[&.active]:font-semibold [&.active]:text-gt-700'
                    )}
                  >
                    {link.to
                      ? <Link {...link}>{link.name}</Link>
                      : <a {...link}>{link.name}</a>}
                  </Button>
                )}

                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1 px-8">
            <Outlet />
            <TanStackRouterDevtools />
          </main>

          <footer className="mt-auto">
            <div className="mx-auto max-w-6xl overflow-hidden px-6 lg:px-8 py-4 sm:py-8">
              <div className="mt-6 lg:mt-8">
                <ul className="flex justify-center gap-x-12">
                  {SOCIALS.map(social =>
                    <li
                      key={social.name}
                      className="text-foreground hover:scale-115 transition-[scale] duration-75 ease-in-out"
                    >
                      <a
                        href={social.href}
                        title={social.name}
                        aria-label={social.name}
                        target='_blank' rel="noopener noreferrer"
                      >
                        <span className="sr-only">{social.name}</span>
                        <IconSvg name={social.name} aria-hidden="true" className="size-7" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <address className="not-italic mt-6 text-center text-sm/6 text-foreground/50">
                &copy; {new Date().getFullYear()} Gordon Ta. Happily based in Boston, MA.
              </address>
            </div>
          </footer>
        </div>
        <Toaster />
      </>
    );
  }
});
