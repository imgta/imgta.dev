import { IconSvg, ExternalLink, LiveLink } from '@/components/IconSvg';
import { HighlightLink } from '@/components/ui/highlight-link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { TechFlex } from '@/components/TechStack';
import { formatDate } from '@/utils/misc';
import { cn } from '@/lib/utils';

interface Project {
  name: string;
  summary: string;
  logo?: string;
  cli?: string;
  cover: { src: string, alt?: string; }[];
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
    cover: [
      { src: '/img/vibby-preview.jpg', alt: 'Video Blog AI preview' },
      { src: '/img/vibby-full.webp', alt: 'Video Blog AI page preview' },
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
    cover: [
      { src: '/img/noot-preview.jpg', alt: 'Nootrient preview' },
      { src: '/img/noot-ad-page.webp', alt: 'Nootrient ads conversion page' },
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
    cover: [
      { src: '/img/wisp-preview.png', alt: 'Word Wisp preview' },
      { src: '/img/wisp-full.jpg', alt: 'Word Wisp page preview' },
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
    cover: [
      { src: '/img/vial-preview.png', alt: 'Vialect preview' },
      { src: '/img/vial-full.webp', alt: 'Vialect page preview' },
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
    cover: [
      { src: '/img/play-preview.jpg', alt: 'playtrace preview' },
      { src: '/img/play-full.webp', alt: 'playtrace page preview' },
    ],
  },
];


function ProjectCard({ project }: { project: Project; }) {
  const { live, demo, repo } = project.links;
  const actions = [];
  if (live) actions.push({ href: live, label: 'Site', title: 'live website', icon: <LiveLink className="size-4.5" /> });
  if (demo) actions.push({ href: demo, label: 'Demo', title: 'demo', icon: <ExternalLink className="size-4.5" /> });
  if (repo) actions.push({ href: repo, label: 'Code', title: 'git repo', icon: <IconSvg name="github" className="size-4.5" /> });

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

  return (
    <Card className="overflow-hidden p-0 gap-0 bg-card/75 border-border shadow-md">
      <section>
        <div className="flex justify-between items-end p-6 pb-0">
          <Header heading={project.name.toLowerCase()} cli={project.cli} />
          <div>
            {/* <time className="flex justify-end items-end gap-1.5 text-xs text-muted-foreground">
              {period.length ? period.join(` – `) : period[0]}
            </time> */}
            <TechFlex stack={project.techStack} iconClass="size-6" />
          </div>
        </div>

        <div className="m-4 border-b border-border" />
        <time className="flex justify-start items-center text-xs text-muted-foreground">
          {period.length ? period.join(` – `) : period[0]}
        </time>
        <div className="flex items-center mt-4 px-8 gap-1">
          <div>
            {project.logo && <IconSvg name={project.logo} className="size-3/4" />}
          </div>
          <div className="font-neuvetica text-lg text-muted-foreground tracking-[0.075em] leading-6.5 text-pretty">
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

      <CardContent className="p-0">
        {/* IMAGES */}
        <div className="relative aspect-[media]">
          <img className={cn(
            'object-cover rounded-xs w-full',
            project.archived && 'grayscale-100 hover:grayscale-0',
          )}
            src={project.cover[0].src ?? "/placeholder.svg"}
            alt={project.cover[0].alt ?? `${project.name} preview`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {project.archived && <Badge variant="destructive">archived</Badge>}
          </div>
        </div>

      </CardContent>
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
