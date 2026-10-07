import { SOCIALS, CONTACTS } from "@/utils/meta";
import { track } from "@/utils/analytics";
import { createFileRoute } from "@tanstack/react-router";
import { HighlightLink } from "@/components/HighlightLink";
import { CmdHeading } from "@/components/CmdHeading";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { MapPin } from "@/components/IconSvg";
import { Image } from "@unpic/react";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <div className="mx-auto flex max-w-4xl justify-center">
      <div>
        <svg
          aria-hidden="true"
          className="mask-[radial-gradient(30rem_36rem_at_center,transparent_50%,#fff) absolute inset-x-0 top-15 left-0 -z-10 min-h-dvh w-full mask-t-from-55% mask-b-from-80%"
        >
          <defs>
            <pattern
              id="gt-grid"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M.5 200V.5H200"
                fill="none"
                strokeDasharray={4.5}
                strokeDashoffset={1.25}
                className="stroke-foreground/24 stroke-[.5]"
              />
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-text-select/3">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" />
          </svg>
          <rect width="100%" height="100%" fill="url(#gt-grid)" />
        </svg>

        {/* HERO */}
        <section className="mt-16 grid grid-cols-1 items-start justify-center gap-4 md:mt-40 md:flex">
          <div className="antialiased">
            <p className="marker font-neuvetica text-7xl font-bold text-gt-600 [word-spacing:-.1rem] dark:text-gt-700">
              Hi there.
            </p>
            <h1 className="font-neuvetica text-[1.9rem]/8.75 text-pretty text-content-700/90 [word-spacing:-.05rem] dark:text-content-400/90">
              I&#700;m
              <span className="marker selection:bg-amber-100/75 selection:text-content-800 dark:selection:bg-transparent dark:selection:text-gt-600">
                {" Gordon, a full-stack engineer "}
              </span>{" "}
              who builds expressive apps
            </h1>

            <div className="mt-[1.8rem] flex items-start justify-between font-neuvetica sm:mt-0 sm:grid">
              <address className="my-1 flex items-end gap-1 text-content-800/95 sm:mt-[3.3rem] sm:gap-1.5 dark:text-foreground">
                <MapPin className="order-last size-4 origin-bottom scale-y-110 stroke-gt-600 sm:order-first dark:stroke-gt-700" />
                <span className="text-[.9rem] leading-4 font-medium [word-spacing:.025rem]">
                  based in
                  <span className="tracking-wide"> Boston, MA</span>
                </span>
              </address>

              <nav aria-label="Social" className="order-first sm:order-0 sm:p-2 sm:pt-2">
                <h2 className="border-l border-gt-600 pb-0.5 pl-4 text-base font-medium tracking-wide text-foreground/90 dark:border-gt-700 dark:text-gt-600">
                  socials
                </h2>
                <ul>
                  {SOCIALS.map(({ name, href }) => (
                    <li
                      key={name}
                      className="group w-fit border-l border-border py-1 pl-2 hover:border-gt-300/70"
                    >
                      <HighlightLink
                        href={href}
                        title={name}
                        aria-label={name}
                        onClick={() => track("social_click", { platform: name.toLowerCase() })}
                      >
                        <span className="h-full pl-3.5">{name}</span>
                      </HighlightLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <figure className="order-first flex justify-center md:order-last md:justify-start">
            <div className="pointer-events-none size-64 select-none lg:size-68">
              <Image
                src="/img/gta.avif"
                alt="Portrait of Gordon with his cat Pixel"
                title="Gordon with his cat Pixel"
                height={600}
                width={600}
                loading="eager"
                decoding="async"
                fetchpriority="high"
                className="animate-[morph_7s_ease-in-out_infinite] saturate-[.85] transition-[filter,border-radius]"
              />
            </div>
          </figure>
        </section>

        {/* TECHSTACK */}
        <section className="mx-auto my-24 max-w-xl space-y-8">
          <CmdHeading heading="tech stack" cli="pnpm add" align="center" />
          <TechStack />
        </section>

        {/* PROJECTS */}
        <section className="my-36">
          <div className="mx-auto max-w-xl">
            <CmdHeading heading="projects" cli="git init">
              <blockquote className="mx-auto max-w-prose font-neuvetica text-base tracking-wider text-foreground/90 dark:text-muted-foreground">
                through sheer curiosity, boyish enthusiasm, and voluntary challenge, projects are
                invitations for <em>thoughtful</em> exploration, <strong>bold</strong>{" "}
                experimentation, and <u>meaningful</u> growth.
              </blockquote>
            </CmdHeading>
          </div>

          <Projects />
        </section>

        {/* CONTACT */}
        <section className="isolate mx-auto my-24 max-w-md px-4 sm:max-w-xl">
          <div>
            <CmdHeading heading="contact me" cli="ping imgta.dev" align="center">
              <p className="text-left font-neuvetica text-lg tracking-wider sm:text-center sm:tracking-[0.075em]">
                Let&#700;s collaborate, talk shop, and geek out.
              </p>
            </CmdHeading>
          </div>
          <div className="mt-8 ml-auto max-w-sm sm:mt-12 sm:max-w-xl md:max-w-none">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:flex md:justify-evenly">
              {CONTACTS.map(({ label, href, text, ariaLabel, title }) => (
                <div key={label} className="w-fit font-neuvetica">
                  <h3 className="border-l border-gt-600 pl-4 text-[1.125rem]/7 font-medium tracking-[0.075em] text-foreground/90 dark:border-gt-700 dark:text-gt-600">
                    {label}
                  </h3>
                  <address className="group border-l border-border py-1 pl-2 tracking-wide not-italic hover:border-gt-300/70">
                    <HighlightLink
                      href={href}
                      title={title}
                      aria-label={ariaLabel}
                      onClick={() => track("contact_click", { type: title.toLowerCase() })}
                    >
                      <span className="pl-4 tracking-[-.0125em] [word-spacing:-.1rem] sm:ml-0">
                        {text}
                      </span>
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
