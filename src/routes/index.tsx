import { createFileRoute } from '@tanstack/react-router';
import { createMetaTags } from '@/utils/meta';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';

//------------------------------------------------------------

export const Route = createFileRoute('/')({
  head: () => createMetaTags({
    title: 'Full-Stack Software Engineer',
    description: 'Full-stack Engineer, Co-founder @ Video Blog AI, skilled in React, Nuxt, FastAPI. From biotech labs to browser tabs, I build expressive, AI-powered software to drive impact with creativity.',
  }),
  component: Index,
});

interface HeaderProps {
  heading: string;
  cli?: string;
  id?: string;
}
function Header({ cli, heading, id }: HeaderProps) {
  const anchorId = heading.replace(' ', '-');
  return (
    <div id={anchorId}>
      {cli && (
        <div className="flex gap-1 items-center text-gt-600/70 dark:text-muted tracking-[-0.075em] -ml-0.5">
          <span className="font-inter text-xs scale-y-125 scale-x-75">&gt;</span>
          <p className="font-dankmono text-sm">{cli}</p>
        </div>
      )}
      <h2 id={id} className="font-neuvetica text-3xl text-foreground/90 dark:text-gt-600 leading-none">
        {heading}
      </h2>
    </div>
  );
}

//------------------------------------------------------------

function Index() {
  return (
    <>
      <div className="flex justify-center max-w-4xl mx-auto mt-8 space-y-1">
        <div>

          <section className="flex justify-center items-center gap-4">
            <div>
              <h3 className="font-neuvetica font-bold text-7xl text-gt-600 dark:text-gt-700 tracking-wide">
                Hi there.
              </h3>
              <h1 className="font-neuvetica font-light text-4xl text-content-700/90 dark:text-content-400/90 tracking-wide">
                I&#700;m Gordon, a full-stack engineer who builds expressive apps.
              </h1>
            </div>
            <div className="flex justify-center max-w-2xl lg:flex-none">
              <div style={{ backgroundImage: 'url("/img/gta.jpg")' }}
                className="bg-cover bg-center bg-no-repeat object-cover max-w-none
                          size-72 row-span-2 row-end-2 border-2 border-content
                          animate-[morph_9s_ease-in-out_infinite] transition-all"
              />
            </div>
          </section>

          <section className="max-w-xl mx-auto my-24 space-y-8">
            <Header heading="tech stack" cli="pnpm add" />
            <TechStack />
          </section>

          <section className="max-w-xl mx-auto my-24 space-y-8">
            <Header heading="projects" cli="git init" />
            <p className="mt-4 font-neuvetica text-lg text-muted-foreground text-pretty tracking-[0.075em]">
              Whether born of sheer curiosity, boyish enthusiasm, or from the lure of voluntary challenge, projects are seen as buoyant invitations for thoughtful exploration, bold experimentation, and meaningful growth.
            </p>
          </section>
          <Projects />


        </div>
      </div>
    </>
  );
}