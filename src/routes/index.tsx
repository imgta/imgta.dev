import { createFileRoute } from '@tanstack/react-router';
import { createMetaTags, SOCIALS, CONTACTS } from '@/utils/meta';
import { HighlightLink } from '@/components/ui/highlight-link';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Header } from '@/components/Header';
import { MapPin } from '@/components/IconSvg';

//------------------------------------------------------------

export const Route = createFileRoute('/')({
  head: () => createMetaTags({
    title: 'Full-Stack Software Engineer',
    description: 'Full-stack Engineer, Co-founder @ Video Blog AI, skilled in React, Nuxt, FastAPI. From biotech labs to browser tabs, I build expressive, AI-powered software to drive impact with creativity.',
  }),
  component: Index,
});

//------------------------------------------------------------

function Index() {
  return (
    <div className="flex justify-center max-w-4xl mx-auto">
      <div>
        <svg aria-hidden="true"
          className="absolute inset-x-0 top-[5rem] left-0 min-h-screen w-full -z-10
                      stroke-content-200/70 dark:stroke-content/50
                      mask-[radial-gradient(32rem_32rem_at_center,#fff,transparent)]"
        >
          <defs><pattern id="gt-grid" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none" /></pattern></defs><svg x="50%" y="-1" className="overflow-visible fill-card/35 dark:fill-card/70"><path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" /></svg><rect width="100%" height="100%" fill="url(#gt-grid)" />
        </svg>

        {/* HERO */}
        <section className="mt-16 md:mt-40
                            grid grid-cols-1 gap-4 md:flex
                            justify-center items-start"
        >
          <div>
            <p className="font-neuvetica font-bold text-7xl text-gt-600 dark:text-gt-700 tracking-wide">Hi there.</p>
            <h1 className="font-neuvetica text-3xl md:text-[2rem]/10 lg:text-4xl text-content-700/90 dark:text-content-400/90 sm:tracking-[0.0125em] md:text-pretty">
              I&#700;m Gordon, a full-stack engineer who builds expressive apps
            </h1>

            <div className="font-neuvetica flex sm:grid items-start justify-between mt-4 sm:mt-0">
              <address className="mt-1 sm:mt-8 mb-4 flex items-end gap-1 sm:gap-1.5 text-content-800/95 dark:text-foreground">
                <MapPin className="size-[1.1rem] scale-y-105 origin-bottom stroke-gt-600 dark:stroke-gt-700 order-last sm:order-first" />
                <span className="leading-4 font-normal tracking-wider">
                  based in Boston, MA
                </span>
              </address>

              <nav aria-label="Social" className="sm:p-4 sm:pt-2 order-first sm:order-none">
                <h2 className="font-medium text-lg tracking-[0.075em] text-foreground/90 dark:text-gt-600 border-l border-gt-600 dark:border-gt-700 pl-4 pb-1">
                  socials
                </h2>
                <ul>
                  {SOCIALS.map(({ name, href }) =>
                    <li
                      key={name}
                      className="w-fit border-l border-border pl-4"
                    >
                      <HighlightLink
                        href={href}
                        title={name}
                        aria-label={name}
                        onClick={() => umami.track('social_click', { platform: name.toLowerCase() })}
                      >
                        <span className="pl-1 dark:text-foreground">{name}</span>
                      </HighlightLink>
                    </li>
                  )}
                </ul>
              </nav>
            </div>

          </div>
          <figure className="order-first md:order-last flex justify-center md:justify-start">
            <div className="size-64 lg:size-[17rem] pointer-events-none select-none">
              <img
                src="/img/gta.jpg"
                alt="Portrait of Gordon with his cat Pixel"
                title="Gordon with his cat Pixel"
                width={600}
                height={600}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="object-cover saturate-[.85]
                          animate-[morph_7s_ease-in-out_infinite]
                          transition-[filter]"
              />
            </div>
          </figure>
        </section>

        {/* TECHSTACK */}
        <section className="max-w-xl mx-auto my-24 space-y-8">
          <Header heading="tech stack" cli="pnpm add" align="center" />
          <TechStack />
        </section>

        {/* PROJECTS */}
        <section className="my-36">
          <div className="max-w-xl mx-auto">
            <Header heading="projects" cli="git init">
              <blockquote className="mx-auto font-neuvetica text-foreground/90 dark:text-muted-foreground text-base tracking-wider max-w-prose">
                through sheer curiosity, boyish enthusiasm, and voluntary challenge, projects are invitations for <em>thoughtful</em> exploration, <strong>bold</strong> experimentation, and <u>meaningful</u> growth.
              </blockquote>
            </Header>
          </div>
          <Projects />
        </section>

        {/* CONTACT */}
        <section className="isolate my-24 max-w-md px-4 sm:max-w-xl mx-auto">
          <div>
            <Header heading="contact" cli="ping imgta.dev" align="center">
              <p className="font-neuvetica text-lg tracking-wider sm:tracking-[0.075em] text-left sm:text-center">
                Let&#700;s collaborate, talk shop, and geek out.
              </p>
            </Header>
          </div>
          <div className="mt-8 sm:mt-12 ml-auto max-w-sm sm:max-w-xl md:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:flex md:justify-evenly">
              {CONTACTS.map(({ label, href, text, ariaLabel, title }) => (
                <div key={label} className="font-neuvetica w-1/3 sm:pl-6">
                  <h3 className="font-medium text-[1.125rem]/7 tracking-[0.075em] text-foreground/90 dark:text-gt-600 border-l border-gt-600 dark:border-gt-700 pl-6">
                    {label}
                  </h3>
                  <address className="tracking-wide not-italic border-l border-border pt-0 sm:pt-2 pl-6">
                    <HighlightLink
                      href={href}
                      title={title}
                      aria-label={ariaLabel}
                      onClick={() => umami.track('contact_click', { type: title.toLowerCase() })}
                    >
                      <span className="sm:ml-0">{text}</span>
                    </HighlightLink>
                  </address>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}