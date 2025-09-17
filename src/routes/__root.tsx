import { createRootRoute, HeadContent, Link, type LinkProps, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { SOCIALS } from '@/utils/meta';
import { IconSvg } from '@/components/IconSvg';
import { Button } from '@/components/ui/button';
import '@/styles/main.css';

//------------------------------------------------------------

interface NavigationLink extends
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel' | 'title' | 'aria-label' | 'onClick'
  >,
  Pick<LinkProps, 'to' | 'hash' | 'activeProps' | 'activeOptions'> {
  name: string;
}

const navLinks: NavigationLink[] = [
  { name: 'Skills', to: '/', hash: 'tech-stack', activeOptions: { exact: true, includeHash: true } },
  { name: 'Projects', to: '/', hash: 'projects', activeOptions: { exact: true, includeHash: true } },
  { name: 'Contact', to: '/', hash: 'contact', activeOptions: { exact: true, includeHash: true } },
  {
    name: 'CV', title: 'Google Drive link', target: '_blank', rel: 'noopener noreferrer',
    href: 'https://drive.google.com/file/d/11FBcQsXcVZ-3cU7uAX1mGK19cd1FOIgC/view?usp=sharing',
    onClick: () => umami.track('cv_click'),
  },
];

//------------------------------------------------------------

export const Route = createRootRoute({
  component: () => {
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
      <>
        <HeadContent />
        <div className="min-h-screen flex flex-col">
          <header
            className="sticky inset-0 top-0 backdrop-blur-[3px] z-20
            bg-content-100/70 dark:bg-sidebar/80 border-b border-muted-foreground/10"
          >
            <nav className="max-w-5xl mx-auto p-8">
              <div className="flex items-center gap-8">

                <section className="hidden sm:flex sm:flex-1">
                  <Link className="flex items-center text-3xl gap-2 group hover:cursor-pointer"
                    onClick={scrollTop}
                    to="/"
                  >
                    <span className="font-inter font-extralight text-xl leading-none scale-y-150
                    text-content-700 group-hover:text-gt-500 dark:text-content-400 dark:group-hover:text-gt-600 group-hover:font-light
                    group-hover:-rotate-90 transition-transform duration-200 ease-in-out"
                    >
                      &gt;
                    </span>
                    <p className="font-neuvetica tracking-[0.07em]">
                      <span className="font-light text-content-500 dark:text-content-600
                                      group-hover:text-content-700 dark:group-hover:text-content-250"
                      >
                        im
                      </span>
                      <span className="font-normal text-content-700 dark:text-content-400
                                      group-hover:text-gt-700 dark:group-hover:text-gt-600"
                      >
                        gta
                      </span>
                    </p>
                  </Link>
                </section>

                {navLinks.map(link => (
                  <Button asChild key={link.name} variant="link"
                    className="font-dankmono lowercase text-[.92rem] tracking-tight px-0
                              text-gt-900 dark:text-content-400
                              hover:text-gt-700 dark:hover:text-gt-600
                              [&.active]:pb-4 [&.active]:underline [&.active]:underline-offset-[0.5rem]
                              [&.active]:font-semibold [&.active]:text-gt-700"
                  >
                    {link.to
                      ? <Link {...link}>{link.name}</Link>
                      : <a {...link}>{link.name}</a>}
                  </Button>
                ))}

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
                  {SOCIALS.map(social => (
                    <li
                      key={social.name}
                      className="text-foreground hover:scale-125 duration-75"
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
                  ))}
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
