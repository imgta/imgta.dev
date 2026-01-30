/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  ClientOnly,
  Outlet,
  Link,
  type LinkProps,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { createMetaTags, SOCIALS } from '@/utils/meta';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { IconSvg } from '@/components/IconSvg';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import '@/styles/main.css';

interface NavigationLink extends
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel' | 'title' | 'aria-label' | 'onClick'
  >,
  Pick<LinkProps, 'to' | 'hash' | 'activeProps' | 'activeOptions'> {
  name: string;
}

const COPYRIGHT_YEAR = new Date().getFullYear();
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
  head: () => createMetaTags({}),
  component: Root,
});

function Root() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const pageY = () => window.pageYOffset
      || (document.documentElement.scrollTop || document.body.scrollTop)
      || 0;
    const onScroll = () => setScrollY(pageY());

    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('scroll', onScroll, { signal, passive: true });
    onScroll(); // initial on-mount scrollY

    return () => controller.abort();
  }, []);

  return (
    <>
      <HeadContent />
      <div className="min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="imgta-theme"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <header
            className={cn(
              'sticky inset-0 top-0 z-20 transition-[box-shadow,background,backdrop-filter] duration-150 ease-out',
              scrollY > 10 && 'backdrop-blur-[9.5px] shadow-md shadow-muted-foreground/25 dark:shadow-border/30 bg-slate-100/36 dark:bg-sidebar/60',
            )}
          >
            <nav
              className={cn(
                'max-w-6xl mx-auto py-8 px-8 transition-[padding-block] duration-250 ease-out',
                scrollY > 10 && 'py-4',
              )}
            >
              <div className="flex items-center gap-8">

                <abbr className="hidden sm:flex sm:flex-1">
                  <Link
                    title="Home"
                    className="flex items-center text-3xl hover:cursor-pointer antialiased group"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    to="/"
                  >
                    <span className={cn(
                      'font-inter font-light dark:font-extralight text-xl leading-none mr-2',
                      'text-content-800/60 group-hover:text-gt-600',
                      'dark:text-gt-500 dark:group-hover:text-gt-600 scale-y-150',
                      scrollY < 10
                        ? 'grayscale-75 opacity-30'
                        : 'group-hover:-rotate-90 dark:group-hover:font-light',
                      'transition-[rotate,scale,filter,opacity,color,font-weight] duration-200 ease-in-out',
                    )}>
                      &gt;
                    </span>
                    <p className="font-neuvetica tracking-[0.0725rem]">
                      <span
                        className="marker font-light text-content-800/85 dark:text-content-400
                        selection:text-content-500 dark:selection:text-content-400
                        group-hover:text-content-800 dark:group-hover:text-content-250
                        transition-[color] duration-50"
                      >
                        im
                      </span>
                      <span
                        className="marker text-gt-700/90 dark:text-gt-500
                        selection:text-content-700 dark:selection:text-gt-500
                        group-hover:text-gt-700 dark:group-hover:text-gt-600
                        transition-[color] duration-50"
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
                    className="font-dankmono lowercase tracking-tight px-0
                    text-[.92rem] text-gt-900 dark:text-content-400
                    hover:text-gt-700 dark:hover:text-gt-600
                    [&.active]:pb-4 [&.active]:underline [&.active]:underline-offset-8
                    [&.active]:font-semibold [&.active]:text-gt-700"
                  >
                    {link.to
                      ? <Link {...link}>{link.name}</Link>
                      : <a {...link}>{link.name}</a>}
                  </Button>
                )}

                <ClientOnly>
                  <div className="ml-auto">
                    <ThemeToggle />
                  </div>
                </ClientOnly>

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
                        rel="noopener noreferrer"
                        target='_blank'
                        href={social.href}
                        title={social.name}
                        aria-label={social.name}
                      >
                        <span className="sr-only">{social.name}</span>
                        <IconSvg
                          aria-hidden="true"
                          name={social.name}
                          className="size-7"
                        />
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <address className="not-italic mt-6 text-center text-sm/6 text-foreground/50">
                &copy; {COPYRIGHT_YEAR} Gordon Ta. Happily based in Boston, MA.
              </address>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </div>
    </>
  );
}
