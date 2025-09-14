import { createFileRoute } from '@tanstack/react-router';
import { createMetaTags } from '@/utils/meta';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Header } from '@/components/Header';
import { TECHS, SOCIAL_KEYS } from '@/lib/tech';
import { HighlightLink } from '@/components/ui/highlight-link';

//------------------------------------------------------------

export const Route = createFileRoute('/')({
  head: () => createMetaTags({
    title: 'Full-Stack Software Engineer',
    description: 'Full-stack Engineer, Co-founder @ Video Blog AI, skilled in React, Nuxt, FastAPI. From biotech labs to browser tabs, I build expressive, AI-powered software to drive impact with creativity.',
  }),
  component: Index,
});

const SOCIALS = SOCIAL_KEYS.map(key => TECHS[key]);

//------------------------------------------------------------

function Index() {
  return (
    <>
      <div className="flex justify-center max-w-4xl mx-auto mt-8 space-y-1">
        <div>

          <svg aria-hidden="true"
            className="absolute inset-x-0 -top-0 -left-32 -z-10 h-screen w-full stroke-content-250 dark:stroke-content/30
            mask-[radial-gradient(40rem_36rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern id="gt-grid" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-card/50 dark:fill-selection/30">
              <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" />
            </svg>
            <rect width="100%" height="100%" fill="url(#gt-grid)" />
          </svg>

          {/* HERO */}
          <section className="flex justify-center items-center gap-4">
            <div>
              <blockquote className="font-neuvetica font-bold text-7xl text-gt-600 dark:text-gt-700 tracking-wide">
                Hi there.
              </blockquote>
              <h1 className="font-neuvetica font-normal text-4xl text-content-700/90 dark:text-content-400/90 tracking-[0.0125em]">
                I&#700;m Gordon, a full-stack engineer who builds expressive apps.
              </h1>

              <div>
                {SOCIALS.map(social => (
                  <div key={social.name} className="flex items-center">
                    <HighlightLink href={social.to} title={social.name} aria-label={social.name}>
                      {social.name}
                    </HighlightLink>
                  </div>
                ))}
              </div>
            </div>

            <figure className="flex justify-center max-w-2xl lg:flex-none">
              <div style={{ backgroundImage: 'url("/img/gta.jpg")' }}
                className="bg-cover bg-center bg-no-repeat object-cover max-w-none
                          size-72 row-span-2 row-end-2 border-2 border-content
                          animate-[morph_9s_ease-in-out_infinite] transition-all"
              />
            </figure>
          </section>

          {/* TECHSTACK */}
          <section className="max-w-xl mx-auto my-24 space-y-8">
            <Header heading="tech stack" cli="pnpm add" />
            <TechStack />
          </section>

          {/* PROJECTS */}
          <section className="my-24 space-y-8">
            <div className="max-w-xl mx-auto">
              <Header heading="projects" cli="git init">
                <p className="font-neuvetica text-lg tracking-[0.075em]">
                  Whether born of sheer curiosity, boyish enthusiasm, or from the lure of voluntary challenge, projects are seen as buoyant invitations for thoughtful exploration, bold experimentation, and meaningful growth.
                </p>
              </Header>
            </div>
            <Projects />
          </section>

        </div>
      </div>
    </>
  );
}