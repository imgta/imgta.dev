import { useLayoutEffect, useRef, useState } from "react";
import { IconSvg, ExternalLink, LiveLink, Plus } from "@/components/IconSvg";
import { Accordion } from "@base-ui/react/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HighlightLink } from "@/components/HighlightLink";
import { CmdHeading } from "@/components/CmdHeading";
import { TechFlex } from "@/components/TechStack";
import { useElementWidth } from "@/hooks/useElementWidth";
import { formatDate } from "@/utils/misc";
import { Image } from "@unpic/react";
import { cn } from "@/lib/utils";

interface ProjectCoverImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

type ProjectLinkMap = Record<"live" | "demo" | "code", { href: string }>;

interface Bullet {
  label: string;
  text: string;
}

interface Project {
  name: string;
  summary: string;
  logo?: string;
  cli?: string;
  covers?: ProjectCoverImage[];
  bullets?: Bullet[];
  techStack: string[];
  startDate: string;
  endDate?: string;
  links: Partial<ProjectLinkMap>;
  featured?: boolean;
  archived?: boolean;
}

const LINK_META = {
  live: { label: "Site", title: "website", Icon: <LiveLink className="size-4.5" /> },
  demo: { label: "Demo", title: "demo website", Icon: <ExternalLink className="size-4.5" /> },
  code: {
    label: "Code",
    title: "code repository",
    Icon: <IconSvg name="github" className="size-4.5" />,
  },
};

const PROJECTS: Project[] = [
  {
    name: "Pryzm Dynamics",
    logo: "pryzm",
    cli: "uv audit",
    summary:
      "Lead full-stack engineer on eWARP, an agentic budget execution and project management platform for the Defense Innovation Unit (DIU) that resolves Congressional funding, purchase requests, vendor contracts, and financial reports into auditable records of commitments, obligations, and expenditures validated against OUSW(C) benchmarks and tracked by color of money from Treasury accounts down to sub-line item numbers.",
    techStack: ["React", "Next.js", "Django", "Celery", "FastAPI", "PostgreSQL", "Docker"],
    bullets: [
      {
        label: "architecture",
        text: "Led development of eWARP, DIU’s budget execution platform for tracking Congressionally appropriated defense funding; architected core financial ledger and data extraction pipelines for DoD IL5 deployment.",
      },
      {
        label: "templating",
        text: "Designed configurable schema-versioned review templates with typed field definitions, so requests for new capture fields are resolved through user configuration--no code changes or redeployment required.",
      },
      {
        label: "evaluation",
        text: "Developed semi-automated extraction evaluation system with per-field confusion matrices, heatmaps, and HITL review loops to curate SME-corrected outputs as ground truth for LLM-assisted remediation.",
      },
      {
        label: "performance",
        text: "Optimized memory utilization across Celery worker pods by replacing redundant per-task OCR model loads with reusable singleton instances, eliminating OOM crashes and unnecessary compute scaling.",
      },
      {
        label: "deployment",
        text: "Cut FedRAMP High deploy time from 2hrs to ~30min via toolchain modernization and Dockerfile pruning.",
      },
    ],
    startDate: "2026-01",
    endDate: "2026-07",
    links: {
      live: { href: "https://pryzm.io" },
    },
  },
  {
    featured: true,
    name: "Video Blog AI",
    logo: "videoblogai",
    cli: "npx nuxthub deploy",
    summary:
      "Co-founder, full-stack software engineer of an AI-powered blogging platform for converting and transforming videos, articles, and user inputs into SEO-optimized blog posts and content clusters.",
    techStack: ["Nuxt", "FastAPI", "Drizzle", "Stripe", "NGINX", "Docker", "Oracle", "Cloudflare"],
    startDate: "2024-01-08",
    links: {
      live: { href: "https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral" },
    },
    covers: [
      { src: "/img/vibby-preview.jpg", alt: "Video Blog AI preview", width: 1174, height: 731 },
      { src: "/img/vibby-full.avif", alt: "Video Blog AI page preview", width: 768, height: 4285 },
    ],
  },
  {
    name: "Nootrient",
    logo: "nootrient",
    cli: "shopify theme push",
    summary:
      "Shopify e-commerce store for a creative lifestyle supplements brand, core WordPress (WooCommerce) data migrations, SEO-optimizations with brand-aligned copywriting, and custom, responsive design.",
    techStack: ["Shopify", "WordPress", "Python", "HTML", "CSS", "SEO", "Copywriting"],
    startDate: "2025-07",
    links: {
      live: { href: "https://nootrient.co" },
    },
    covers: [
      { src: "/img/noot-preview.avif", alt: "Nootrient preview", width: 1176, height: 845 },
      { src: "/img/noot-ad-page.webp", alt: "Nootrient ad landing page", width: 768, height: 3609 },
    ],
  },
  {
    name: "Word Wisp",
    cli: "docker-compose up -d",
    summary:
      "(Demo unavailable--project is currently being migrated and updated). An AI co-authoring tool for writing in classic literary styles via semantic retrieval over Project Gutenberg text, enabling contextually accurate rewrites. Built on Next.js (App Router), Neon serverless Postgres, Chroma vector database, and AWS EC2.",
    techStack: ["React", "Next.js", "Drizzle", "Neon", "Chroma", "Docker", "AWS EC2"],
    startDate: "2025-05",
    endDate: "2025-05",
    links: {},
    covers: [
      { src: "/img/wisp-preview.webp", alt: "Word Wisp preview", width: 960, height: 479 },
      { src: "/img/wisp-full.webp", alt: "Word Wisp page preview", width: 768, height: 1823 },
    ],
  },
  {
    name: "Vialect",
    cli: "streamlit run app.py",
    summary:
      "A Streamlit (Python) video/audio transcriber app that generates timestamped transcripts and summaries with TTS narration, featuring FFMPEG media preprocessing, speaker diarization, and cross-platform video URL intake.",
    techStack: ["Streamlit", "Python", "OpenAI", "HuggingFace", "FFMPEG", "PyTorch"],
    startDate: "2023-11",
    endDate: "2023-12",
    links: { code: { href: "https://github.com/imgta/vialect" } },
    covers: [
      { src: "/img/vial-preview.png", alt: "Vialect preview", width: 1127, height: 578 },
      { src: "/img/vial-full.webp", alt: "Vialect page preview", width: 768, height: 1284 },
    ],
  },
  {
    archived: true,
    name: "playtrace",
    cli: "npx strapi start",
    summary:
      "playtrace was a full-stack events hosting web app built on Nuxt (frontend) and Strapi CMS (backend), featuring Unsplash/GIPHY cover image search, AWS S3 storage, Google Places autocompletes, and Google Routes for multi-location mapping.",
    techStack: ["Nuxt", "Strapi", "Supabase", "Cloudflare", "Render", "Google Places", "AWS S3"],
    startDate: "2023-08",
    endDate: "2023-11",
    links: {},
    covers: [
      { src: "/img/play-preview.avif", alt: "playtrace preview", width: 1000, height: 763 },
      { src: "/img/play-full.webp", alt: "playtrace page preview", width: 768, height: 2918 },
    ],
  },
];

const PX_PER_SEC = 175;
const MIN_DURATION_S = 6;

export function Projects() {
  return (
    <section className="mx-auto max-w-3xl py-16">
      <div className="space-y-8">
        {PROJECTS.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const actions = Object.entries(project.links).map(([kind, { href }]) => {
    const { label, title, Icon } = LINK_META[kind as "live" | "demo" | "code"];
    return { href, label, title, Icon };
  });

  //------------------------------------------------------------

  const { startDate, endDate } = project;
  const period: string[] = [];
  // date-only ISO strings parse as UTC midnight; format in UTC so western timezones don't roll back a month
  const timeZone = "UTC";

  if (!endDate) {
    period.push(formatDate(startDate, { format: "YYYY", timeZone }), "present");
  } else if (endDate === startDate) {
    period.push(formatDate(startDate, { format: "MMM YYYY", timeZone }));
  } else {
    const [startYr] = startDate.split("-");
    const [endYr] = endDate.split("-");
    const sameYear = startYr === endYr;

    period.push(
      formatDate(startDate, { format: sameYear ? "MMM" : "MMM YYYY", timeZone }),
      formatDate(endDate, { format: "MMM YYYY", timeZone }),
    );
  }

  //------------------------------------------------------------

  return (
    <Card className="gap-0 overflow-hidden border-none bg-card p-0 shadow-md">
      <section className={cn({ "pb-6": !project.covers })}>
        {/* HEADING */}
        <div className="items-end justify-between space-y-4 px-8 pt-6 sm:flex sm:space-y-0">
          <div className="hidden sm:block">
            <CmdHeading heading={project.name.toLowerCase()} cli={project.cli} />
          </div>
          <div className="sm:hidden">
            <CmdHeading heading={project.name.toLowerCase()} align="center center" />
          </div>
          <div className="mx-auto max-w-fit sm:mx-0">
            <TechFlex stack={project.techStack} iconClass="size-5.5 sm:size-6" />
          </div>
        </div>

        <div className="m-4 border-b border-border" />

        {/* CONTENT */}
        <div className="grid items-center gap-x-4.5 px-6 sm:grid-cols-[auto_1fr]">
          {project.logo && (
            <div className="my-auto hidden items-center sm:flex">
              <IconSvg className="min-h-20 w-auto sm:min-h-24" name={project.logo} />
            </div>
          )}
          <div className="space-y-2 sm:space-y-0">
            <div className="mb-[.324rem] flex items-center justify-between gap-x-1 sm:justify-start">
              {!project.archived && actions.length > 0 && (
                <>
                  <div>
                    {actions.map(({ href, label, title, Icon }) => (
                      <HighlightLink
                        key={label}
                        href={href}
                        title={`${project.name} ${title}`}
                        aria-label={`Link to ${project.name}'s ${title}`}
                        onClick={() =>
                          umami.track("project_view", {
                            name: trackName(project.name),
                          })
                        }
                        className="group"
                      >
                        <div className="-mx-0.5 inline-flex items-center gap-1.5 align-bottom">
                          {Icon}
                          <span className="text-[.9rem] font-bold tracking-[-.125em]">{label}</span>
                        </div>
                      </HighlightLink>
                    ))}
                  </div>
                  <span className="-mt-1.5 hidden px-2 text-lg font-light tracking-tighter text-muted-foreground/80 sm:block">
                    \\
                  </span>
                </>
              )}
              <time className="font-neuvetica text-[.825rem] tracking-wider text-muted-foreground/80 lowercase">
                {period.length ? period.join(`–`) : period[0]}
              </time>
            </div>

            <div className="font-neuvetica leading-6 tracking-wide text-pretty text-foreground/90 [word-spacing:-.025rem] sm:pr-1.75 dark:text-foreground/65">
              {project.summary}
            </div>
          </div>
          {project.bullets && project.bullets.length > 0 && (
            <ProjectBullets name={project.name} bullets={project.bullets} />
          )}
        </div>
      </section>

      {project.covers && <ProjectCovers covers={project.covers} archived={project.archived} />}
    </Card>
  );
}

interface ProjectBulletsProps {
  name: string;
  bullets: Bullet[];
}

function ProjectBullets({ name, bullets }: ProjectBulletsProps) {
  return (
    <Accordion.Root
      multiple
      hiddenUntilFound
      className="mt-4 divide-y divide-border sm:col-span-2 sm:mx-4"
    >
      {bullets.map(({ label, text }) => (
        <Accordion.Item
          key={label}
          value={label}
          onOpenChange={(open, details) => {
            // browser find-in-page opens a panel with reason 'none'; only count deliberate opens
            if (open && details.reason === "trigger-press") {
              void umami.track("project_expand", { name: trackName(name), item: label });
            }
          }}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between rounded-xs py-[.539rem] text-left antialiased select-none">
              <span className="font-neuvetica text-[.95rem] tracking-wider text-muted-foreground/80 lowercase transition-colors duration-150 group-hover:text-gt-700 group-data-panel-open:text-gt-700 motion-reduce:transition-none dark:group-hover:text-content-400 dark:group-data-panel-open:text-content-400">
                {label}
              </span>
              <Plus
                aria-hidden
                className="size-3.75 shrink-0 text-muted-foreground transition-[rotate,color] duration-150 ease-in-out group-hover:text-gt-700 group-data-panel-open:rotate-45 group-data-panel-open:text-gt-700 motion-reduce:transition-none dark:group-hover:text-content-400 dark:group-data-panel-open:text-content-400"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-150 ease-in-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none [&[hidden]:not([hidden='until-found'])]:hidden">
            <p className="pb-[.809rem] pl-2.5 font-neuvetica text-[.9125rem] leading-5.25 tracking-wider text-foreground/85 sm:text-pretty dark:text-foreground/65">
              {text}
            </p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

interface ProjectCoversProps {
  covers: ProjectCoverImage[];
  archived?: boolean;
}

function ProjectCovers({ covers, archived }: ProjectCoversProps) {
  const [figureRef, cardWidth] = useElementWidth();
  const [preview, full] = covers;
  const previewAspectRatio = cardWidth / preview.width;
  const fullAspectRatio = cardWidth / full.width;
  const lockHeight = preview.height * previewAspectRatio;

  const scrollDeltaY = full.height * fullAspectRatio - lockHeight;
  const scrollDuration = Math.max(scrollDeltaY / PX_PER_SEC, MIN_DURATION_S);

  const [hovering, setHovering] = useState(false);
  const hoverStart = useRef<number | null>(null);

  const [manual, setManual] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    hoverStart.current = performance.now();
    setHovering(true);
  }

  function onLeave() {
    hoverStart.current = null;
    setHovering(false);
  }

  function handleClick() {
    if (!manual) {
      const elapsedMs = hoverStart.current ? performance.now() - hoverStart.current : 0;
      const scrollPct = Math.min(elapsedMs / (scrollDuration * 1000), 1);
      setScrollOffset(scrollPct * scrollDeltaY);
    }
    setManual(prev => !prev);
    setHovering(prev => !prev);
  }

  useLayoutEffect(() => {
    if (manual && scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollOffset;
    }
  }, [manual, scrollOffset]);

  return (
    <section className="mt-8">
      <figure
        ref={figureRef}
        style={{ height: lockHeight }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleClick}
        className="relative aspect-[media] overflow-hidden"
      >
        <Image
          src={preview.src}
          alt={preview.alt}
          title={preview.alt}
          height={preview.height}
          width={768}
          layout="constrained"
          decoding="async"
          loading="lazy"
          className={cn("transition-[filter,opacity,display]", {
            "brightness-90 grayscale-[.95]": archived,
            "opacity-0": hovering,
            hidden: manual,
          })}
        />
        {manual ? (
          <div
            ref={scrollerRef}
            className="absolute inset-0 cursor-n-resize overflow-y-auto [-webkit-overflow-scrolling:touch]" /* iOS momentum */
          >
            <Image
              src={full.src}
              alt={full.alt}
              height={full.height}
              width={768}
              decoding="async"
              layout="constrained"
              className="pointer-events-none"
            />
          </div>
        ) : (
          <div
            style={
              {
                "--scroll-delta-y": `-${scrollDeltaY}px`,
                "--scroll-duration": `${scrollDuration}s`,
              } as React.CSSProperties
            }
          >
            <Image
              className={cn(
                "absolute inset-0 cursor-pointer",
                "transition-transform ease-linear",
                hovering
                  ? "translate-y-(--scroll-delta-y) delay-200 duration-(--scroll-duration)"
                  : "translate-y-0 opacity-0 delay-0",
              )}
              src={full.src}
              alt={full.alt}
              height={full.height}
              width={768}
              layout="constrained"
            />
          </div>
        )}

        {archived && (
          <figcaption className="absolute top-3 left-1/2 -translate-x-1/2">
            <Badge variant="destructive">archived</Badge>
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function trackName(name: string) {
  return name.toLowerCase().replace(/\s+/g, "_");
}
