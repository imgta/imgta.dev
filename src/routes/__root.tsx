import { createRootRoute, HeadContent, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
import { TECHS, SOCIAL_KEYS } from '@/lib/tech';
import { LogoIcon } from '@/components/LogoIcon';
import '@/styles/main.css';


//------------------------------------------------------------

interface NavagationLink {
  to: string;
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navLinks: NavagationLink[] = [
  { name: 'Skills', to: '#tech-stack' },
  { name: 'Projects', to: '#projects' },
  { name: 'CV', to: 'https://drive.google.com/file/d/11FBcQsXcVZ-3cU7uAX1mGK19cd1FOIgC/view?usp=sharing' },
];

const SOCIALS = SOCIAL_KEYS.map(key => TECHS[key]);

//------------------------------------------------------------

export const Route = createRootRoute({
  component: () => {
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
      <>
        <HeadContent />

        <div className="min-h-screen flex flex-col">
          <header className="sticky bg-selection/50 dark:bg-selection/30 inset-0 top-0 z-20 backdrop-blur-[2.5px] border-b border-muted-foreground/10">
            <nav className="max-w-5xl mx-auto px-8 py-8">
              <div className="flex items-center gap-8">

                <section className="hidden sm:flex sm:flex-1">
                  <Link className="flex items-center text-3xl gap-2 group hover:cursor-pointer"
                    onClick={scrollTop}
                    to="/"
                  >
                    <span className="font-inter font-extralight text-xl text-content-800 leading-none scale-y-150
                    dark:text-content-400/90 group-hover:text-gt-500 dark:group-hover:text-gt-400 group-hover:font-light
                    group-hover:-rotate-90 transition-transform duration-200 ease-in-out"
                    >
                      &gt;
                    </span>
                    <p className="font-neuvetica tracking-[0.07em]">
                      <span className="font-light text-content-500/60 dark:text-content-600
                                      group-hover:text-content-700 dark:group-hover:text-content-250"
                      >
                        im
                      </span>
                      <span className="font-normal text-content-700 dark:text-content-400/90
                                      group-hover:text-gt-600 dark:group-hover:text-gt-400"
                      >
                        gta
                      </span>
                    </p>
                  </Link>
                </section>

                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-neuvetica lowercase text-[1.1rem] tracking-[0.07em]
                              text-content-700 dark:text-content-400
                              hover:text-gt-600 dark:hover:text-gt-600
                              [&.active]:text-gt-600 [&.active]:font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex-1 px-8">
            <Outlet />
            <TanStackRouterDevtools />
          </main>

          <footer className="mt-auto">
            <div className="mx-auto max-w-6xl overflow-hidden px-6 lg:px-8 py-4 sm:py-8">
              <div className="mt-6 lg:mt-8 flex justify-center gap-x-12">
                {SOCIALS.map(social => (
                  <a
                    key={social.to}
                    href={social.to}
                    title={social.name}
                    aria-label={social.name}
                    target='_blank' rel="noopener noreferrer"
                    className="text-foreground hover:scale-125 duration-75"
                  >
                    <span className="sr-only">{social.name}</span>
                    <LogoIcon name={social.name} aria-hidden="true" className="size-7" />
                  </a>
                ))}
              </div>

              <p className="mt-8 text-center text-sm/6 text-foreground/50">
                &copy; {new Date().getFullYear()} Gordon Ta. Happily based in Boston, MA.
              </p>
            </div>
          </footer>
        </div>

        <Toaster />
      </>
    );
  }
});
