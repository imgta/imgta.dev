import { IconSvg, ExternalLink, LiveLink } from '@/components/IconSvg';
import { HighlightLink } from '@/components/ui/highlight-link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { TechFlex } from '@/components/TechStack';
import { formatDate } from '@/utils/misc';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProjectCoverImage {
  src: string,
  width: number;
  height: number;
  alt?: string;
}

interface Project {
  name: string;
  summary: string;
  logo?: string;
  cli?: string;
  covers: ProjectCoverImage[];
  techStack: string[];
  startDate: string;
  endDate?: string;
  links: {
    live?: string;
    demo?: string;
    repo?: string;
  };
  featured?: boolean;
  archived?: boolean;
}

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
      live: 'https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral',
      demo: 'https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral',
      repo: 'https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral',
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
    links: { live: 'https://nootrient.co' },
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
    links: { demo: 'https://wisp-eta.vercel.app' },
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
    links: { repo: 'https://github.com/imgta/vialect' },
    covers: [
      { src: '/img/vial-preview.png', alt: 'Vialect preview', width: 1127, height: 578 },
      { src: '/img/vial-full.webp', alt: 'Vialect page preview', width: 1500, height: 2507 },
    ],
  },
  {
    archived: true,
    name: 'playtrace',
    cli: 'npx strapi start',
    summary: 'playtrace was a full-stack events hosting web app built on Nuxt (frontend) and Strapi CMS (backend), Unsplash/GIPHY cover image search, AWS S3 storage, Google Places autocompletes, and Google Routes for multi-location mapping.',
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
const MIN_DURATION_S = 5;
const CARD_MAX_WIDTH = 768; // max-w-3xl

function ProjectCard({ project }: { project: Project; }) {
  const [hovering, setHovering] = useState(false);
  const [preview, full] = project.covers;

  const previewAspectRatio = CARD_MAX_WIDTH / preview.width;
  const fullAspectRatio = CARD_MAX_WIDTH / full.width;
  const lockHeight = preview.height * previewAspectRatio; // viewport

  const scaledFullHeight = full.height * fullAspectRatio;
  const scrollYDelta = scaledFullHeight - lockHeight;
  const scrollDuration = Math.ceil(Math.max(scrollYDelta / PX_PER_SEC, MIN_DURATION_S));

  //------------------------------------------------------------

  const { live, demo, repo } = project.links;
  const actions = [];
  if (live) actions.push({ href: live, label: 'Site', title: 'live website', icon: <LiveLink className="size-4.5" /> });
  if (demo) actions.push({ href: demo, label: 'Demo', title: 'demo', icon: <ExternalLink className="size-4.5" /> });
  if (repo) actions.push({ href: repo, label: 'Code', title: 'git repo', icon: <IconSvg name="github" className="size-4.5" /> });

  //------------------------------------------------------------

  const { startDate, endDate } = project;
  const period = [];

  if (!endDate) period.push(
    formatDate(startDate, { format: 'YYYY' }),
    'present'
  );

  if (endDate) {
    if (endDate !== startDate) {
      const [startYr] = startDate.split('-');
      const [endYr] = endDate.split('-');
      if (startYr === endYr) period.push(
        formatDate(startDate, { format: 'MMM' }),
        formatDate(endDate, { format: 'MMM YYYY' })
      );
      else period.push(
        formatDate(startDate, { format: 'MMM YYYY' }),
        formatDate(endDate, { format: 'MMM YYYY' })
      );
    }
    else period.push(formatDate(startDate, { format: 'MMM YYYY' }));
  }

  //------------------------------------------------------------

  return (
    <Card className="overflow-hidden p-0 gap-0 bg-card/75 border-none shadow-md">
      <section>
        <div className="flex justify-between items-end p-6 pb-0">
          <Header heading={project.name.toLowerCase()} cli={project.cli} />
          <div>
            <time className="flex justify-end items-end gap-1.5 text-xs text-muted-foreground">
              {period.length ? period.join(` – `) : period[0]}
            </time>
            <TechFlex stack={project.techStack} iconClass="size-6" />
          </div>
        </div>

        <div className="m-4 border-b border-border" />

        <div className="flex items-center mt-4 px-8 gap-1">
          <div>
            {project.logo && <IconSvg name={project.logo} className="size-3/4" />}
          </div>
          <div className="font-neuvetica text-lg text-muted-foreground tracking-wider leading-6.5 text-pretty">
            {project.summary}
          </div>
        </div>

        {/* LINKS */}
        <div className="pt-4 pb-2 px-8">
          {!project.archived && actions.length &&
            <div className="flex justify-end items-end gap-6">
              {actions.map(a =>
                <div key={a.label} className="flex items-center group">
                  <HighlightLink
                    href={a.href}
                    title={`${project.name} ${a.title}`}
                    aria-label={`Link to ${project.name}'s ${a.title}`}
                  >
                    <p className="flex justify-center">
                      <span className="hidden group-hover:block pr-1">
                        {a.icon}
                      </span>
                      <span className="group-hover:hidden min-w-5.5 tracking-[-0.15rem] 
                      font-dankmono font-thin text-muted-foreground/50 scale-y-125">
                        \\
                      </span>
                      <span>{a.label}</span>
                    </p>
                  </HighlightLink>
                </div>
              )}
            </div>
          }
        </div>
      </section>

      {/* IMAGES */}
      <div className="inset-0">
        <figure
          className={cn(
            'relative overflow-hidden aspect-[media]',
            project.archived && 'grayscale-100 hover:grayscale-0',
          )}
          style={{ height: `${lockHeight}px` }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            className={cn(
              `absolute inset-0 w-full h-auto object-cover`,
              'transition-transform ease-[cubic-bezier(0, 1, 1, 1)]',
            )}
            style={{
              transform: hovering ? `translateY(-${scrollYDelta}px)` : 'translateY(0)',
              transitionDuration: hovering ? `${scrollDuration}s` : 'initial',
            }}
            src={hovering ? full.src : preview.src}
            alt={preview.alt ?? `${project.name} preview`}
            width={hovering ? full.width : preview.width}
            height={hovering ? full.height : preview.height}
            loading="lazy"
            decoding="async"
          />

          {project.archived &&
            <figcaption className="absolute left-3 top-3 flex gap-2">
              <Badge variant="destructive">archived</Badge>
            </figcaption>
          }
        </figure>
      </div>
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
