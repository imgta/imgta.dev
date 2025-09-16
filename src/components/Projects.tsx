import { useLayoutEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { TechFlex } from '@/components/TechStack';
import { HighlightLink } from '@/components/ui/highlight-link';
import { IconSvg, ExternalLink, LiveLink } from '@/components/IconSvg';
import { useElementWidth } from '@/hooks/useElementWidth';
import { formatDate } from '@/utils/misc';
import { cn } from '@/lib/utils';

interface ProjectCoverImage {
  src: string,
  width: number;
  height: number;
  alt?: string;
}

type ProjectLinkMap = Record<'live' | 'demo' | 'code', { href: string; }>;

interface Project {
  name: string;
  summary: string;
  logo?: string;
  cli?: string;
  covers: ProjectCoverImage[];
  techStack: string[];
  startDate: string;
  endDate?: string;
  links: Partial<ProjectLinkMap>;
  featured?: boolean;
  archived?: boolean;
}

const LINK_META = {
  live: { label: 'Visit', title: 'website', Icon: <LiveLink className="size-4.5" /> },
  demo: { label: 'Demo', title: 'demo website', Icon: <ExternalLink className="size-4.5" /> },
  code: { label: 'Code', title: 'code repository', Icon: <IconSvg name="github" className="size-4.5" /> },
};

const PROJECTS: Project[] = [
  {
    featured: true,
    name: 'Video Blog AI',
    logo: 'videoblogai',
    cli: 'npx nuxthub deploy',
    summary: 'Co-founder, full-stack software engineer of an AI-powered blogging platform for converting and transforming videos, articles, and user inputs into SEO-optimized blog posts and content clusters.',
    techStack: [
      'Nuxt',
      'FastAPI',
      'Drizzle',
      'Stripe',
      'NGINX',
      'Docker',
      'Oracle',
      'Cloudflare',
    ],
    startDate: '2024-01-08',
    links: {
      live: { href: 'https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral' },
    },
    covers: [
      { src: '/img/vibby-preview.jpg', alt: 'Video Blog AI preview', width: 1174, height: 731 },
      { src: '/img/vibby-full.webp', alt: 'Video Blog AI page preview', width: 1200, height: 6696 },
    ],
  },
  {
    name: 'Nootrient',
    logo: 'nootrient',
    cli: 'shopify theme push',
    summary: 'Shopify e-commerce store for a creative lifestyle supplements brand, core WordPress (WooCommerce) data migrations, SEO-optimizations with brand-aligned copywriting, and custom, responsive design.',
    techStack: [
      'Shopify',
      'WordPress',
      'Python',
      'HTML',
      'CSS',
      'SEO',
      'Copywriting',
    ],
    startDate: '2025-07',
    links: { live: { href: 'https://nootrient.co' } },
    covers: [
      { src: '/img/noot-preview.jpg', alt: 'Nootrient preview', width: 1176, height: 845 },
      { src: '/img/noot-ad-page.webp', alt: 'Nootrient ads conversion page', width: 1127, height: 5296 },
    ],
  },
  {
    name: 'Word Wisp',
    cli: 'docker-compose up -d',
    summary: 'An AI co-authoring tool for writing in classic literary styles via semantic retrieval over Project Gutenberg text, enabling contextually accurate rewrites. Built on Next.js (App Router), Neon serverless Postgres, Chroma vector database, and AWS EC2.',
    techStack: [
      'React',
      'Next.js',
      'Drizzle',
      'Neon',
      'Chroma',
      'Docker',
      'AWS EC2',
    ],
    startDate: '2025-05',
    endDate: '2025-05',
    links: { demo: { href: 'https://wisp-eta.vercel.app' } },
    covers: [
      { src: '/img/wisp-preview.png', alt: 'Word Wisp preview', width: 1278, height: 850 },
      { src: '/img/wisp-full.png', alt: 'Word Wisp page preview', width: 1127, height: 1998 },
    ],
  },
  {
    name: 'Vialect',
    cli: 'streamlit run app.py',
    summary: 'A Streamlit (Python) video/audio transcriber app that generates timestamped transcripts and summaries with TTS narration, featuring FFMPEG media preprocessing, speaker diarization, and cross-platform video URL intake.',
    techStack: [
      'Streamlit',
      'Python',
      'OpenAI',
      'HuggingFace',
      'FFMPEG',
      'PyTorch',
    ],
    startDate: '2023-11',
    endDate: '2023-12',
    links: { code: { href: 'https://github.com/imgta/vialect' } },
    covers: [
      { src: '/img/vial-preview.png', alt: 'Vialect preview', width: 1127, height: 578 },
      { src: '/img/vial-full.webp', alt: 'Vialect page preview', width: 1500, height: 2507 },
    ],
  },
  {
    archived: true,
    name: 'playtrace',
    cli: 'npx strapi start',
    summary: 'playtrace was a full-stack events hosting web app built on Nuxt (frontend) and Strapi CMS (backend), featuring Unsplash/GIPHY cover image search, AWS S3 storage, Google Places autocompletes, and Google Routes for multi-location mapping.',
    techStack: [
      'Nuxt',
      'Strapi',
      'Supabase',
      'Cloudflare',
      'Render',
      'Google Places',
      'AWS S3',
    ],
    startDate: '2023-08',
    endDate: '2023-11',
    links: {},
    covers: [
      { src: '/img/play-preview.jpg', alt: 'playtrace preview', width: 1000, height: 763 },
      { src: '/img/play-full.webp', alt: 'playtrace page preview', width: 1000, height: 3800 },
    ],
  },
];

const PX_PER_SEC = 175;
const MIN_DURATION_S = 6;

function ProjectCard({ project }: { project: Project; }) {
  const [figureRef, cardWidth] = useElementWidth();
  const [preview, full] = project.covers;
  const previewAspectRatio = cardWidth / preview.width;
  const fullAspectRatio = cardWidth / full.width;
  const lockHeight = preview.height * previewAspectRatio;

  const scrollDeltaY = (full.height * fullAspectRatio) - lockHeight;
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
      const elapsedMs = hoverStart.current
        ? performance.now() - hoverStart.current
        : 0;
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

  //------------------------------------------------------------

  const actions = Object.entries(project.links).map(([kind, { href }]) => {
    const { label, title, Icon } = LINK_META[kind as 'live' | 'demo' | 'code'];
    return { href, label, title, Icon };
  });

  //------------------------------------------------------------

  const { startDate, endDate } = project;
  const period: string[] = [];

  if (!endDate) {
    period.push(formatDate(startDate, { format: 'YYYY' }), 'present');
  } else if (endDate === startDate) {
    period.push(formatDate(startDate, { format: 'MMM YYYY' }));
  } else {
    const [startYr] = startDate.split('-');
    const [endYr] = endDate.split('-');
    const sameYear = startYr === endYr;

    period.push(
      formatDate(startDate, { format: sameYear ? 'MMM' : 'MMM YYYY' }),
      formatDate(endDate, { format: 'MMM YYYY' }),
    );
  }

  //------------------------------------------------------------

  return (
    <Card className="overflow-hidden p-0 gap-0 bg-card/75 border-none shadow-md">
      <section>
        {/* HEADING */}
        <div className="space-y-4 sm:space-y-0 sm:flex justify-between items-end px-8 pt-6">
          <div className="hidden sm:block">
            <Header heading={project.name.toLowerCase()} cli={project.cli} />
          </div>
          <div className="sm:hidden">
            <Header heading={project.name.toLowerCase()} align="center center" />
          </div>
          <div className="max-w-fit sm:mx-0 mx-auto">
            <TechFlex stack={project.techStack} iconClass="size-5.5 sm:size-6" />
          </div>
        </div>

        <div className="m-4 border-b border-border" />

        {/* CONTENT */}
        <div className="flex items-center px-6 gap-4.5">
          {project.logo &&
            <div className="hidden sm:flex items-center my-auto">
              <IconSvg className="min-h-20 sm:min-h-24 w-auto" name={project.logo} />
            </div>
          }
          <div className="space-y-2 sm:space-y-0">
            <div className="flex justify-between sm:justify-start items-center gap-x-1">
              {(!project.archived && actions.length) &&
                <>
                  <div className="flex gap-4">
                    {actions.map(a =>
                      <HighlightLink
                        key={a.label}
                        href={a.href}
                        title={`${project.name} ${a.title}`}
                        aria-label={`Link to ${project.name}'s ${a.title}`}
                      >
                        <p className="flex gap-1.5 text-foreground">
                          <span>{a.Icon}</span>
                          <span className="text-[.9rem] tracking-tighter">
                            {a.label}
                          </span>
                        </p>
                      </HighlightLink>
                    )}
                  </div>
                  <span className="hidden sm:block -mt-1 px-2 text-lg text-muted-foreground/80 font-light tracking-tighter">
                    \\
                  </span>
                </>
              }
              <time className="font-neuvetica text-muted-foreground/80 text-[.825rem] tracking-wider lowercase">
                {period.length ? period.join(`–`) : period[0]}
              </time>
            </div>
            <div className="font-neuvetica leading-6 sm:leading-6.5 text-foreground/90 dark:text-foreground/60 tracking-[.0375em] text-pretty">
              {project.summary}
            </div>
          </div>
        </div>
      </section>

      {/* IMAGES */}
      <section className="mt-8">
        <figure
          ref={figureRef}
          className={cn('relative overflow-hidden aspect-[media]')}
          style={{ height: lockHeight }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={handleClick}
        >
          <img
            className={cn(
              `absolute inset-0 w-full h-auto object-cover`,
              project.archived && 'grayscale-[.95] brightness-90',
              hovering && 'opacity-0',
              manual && 'hidden',
            )}
            src={preview.src}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            loading="lazy"
            decoding="async"
          />

          {manual ? (
            <div
              ref={scrollerRef}
              className="absolute inset-0 size-full object-cover overflow-y-auto cursor-n-resize"
              style={{ WebkitOverflowScrolling: 'touch' }}   /* iOS momentum */
            >
              <img
                className="w-full h-auto object-cover pointer-events-none"
                src={full.src}
                alt={full.alt}
                width={full.width}
                height={full.height}
                fetchPriority="high"
              />
            </div>
          ) : (
            <img
              className={cn(
                `absolute inset-0 w-full h-auto object-cover cursor-pointer`,
                'transition-transform ease-linear',
                hovering ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                transform: hovering ? `translateY(-${scrollDeltaY}px)` : 'translateY(0)',
                transitionDuration: hovering ? `${scrollDuration}s` : 'initial',
                transitionDelay: hovering ? '200ms' : '0s',
              }}
              src={full.src}
              alt={full.alt}
              width={full.width}
              height={full.height}
              fetchPriority="high"
            />
          )}

          {project.archived &&
            <figcaption className="absolute left-3 top-3 flex gap-2">
              <Badge variant="destructive">archived</Badge>
            </figcaption>
          }
        </figure>
      </section>
    </Card>
  );
}


export function Projects() {
  return (
    <section className="py-16 max-w-3xl mx-auto">
      <div className="space-y-8">
        {PROJECTS.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
