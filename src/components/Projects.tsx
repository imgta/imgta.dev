import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { LogoIcon } from '@/components/LogoIcon';
import { TechFlex } from '@/components/TechFlex';
import { formatDate } from '@/utils/misc';
import { DateBlock } from '@/components/DateBlock';


interface Project {
  name: string;
  summary: string;
  logo?: string;
  tagline?: string;
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
    name: 'Video Blog AI',
    logo: 'videoblogai',
    summary: 'Co-founder of an AI-powered blogging platform for transforming video, text, and user content into SEO-optimized blog posts.',
    techStack: [
      'Nuxt',
      'FastAPI',
      'Drizzle',
      'Stripe',
      'Docker',
      'NGINX',
      'Cloudflare',
      'Oracle',
    ],
    startDate: '2024-01-08',
    links: { live: 'https://videoblog.ai?utm_source=imgta.dev&utm_medium=referral', },
    cover: [
      { src: '/img/vibby-preview.jpg', alt: 'Video Blog AI preview' },
      { src: '/img/vibby-full.webp', alt: 'Video Blog AI page preview' },
    ],
    featured: true,
  },
  {
    name: 'Nootrient',
    logo: 'nootrient',
    summary: 'Shopify e-commerce site for a creative lifestyle supplement brand, complete with migrated WooCommerce (WordPress) core data, SEO-optimized copy rewrites, and responsive layout redesigns.',
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
    summary: 'AI co-authoring tool that rewrites text in classic literary styles using semantic retrieval over Project Gutenberg corpus to deliver narrative-accurate edits with source attribution.',
    techStack: [
      'React',
      'Next.js',
      'Neon',
      'Docker',
      'Chroma',
      'AWS EC2',
    ],
    startDate: '2025-05',
    links: { demo: 'https://wisp-eta.vercel.app' },
    cover: [
      { src: '/img/wisp-preview.png', alt: 'Word Wisp preview' },
      { src: '/img/wisp-full.jpg', alt: 'Word Wisp page preview' },
    ],
  },
  {
    name: 'Vialect',
    summary: 'Multimedia transcriber that transforms video and audio into navigable transcripts and summaries, improving accessibility for multilingual audiences and content consumers.',
    techStack: ['Python', 'Streamlit', 'HuggingFace', 'PyTorch'],
    startDate: '2023-11',
    endDate: '2023-12',
    links: { repo: 'https://github.com/imgta/vialect' },
    cover: [
      { src: '/img/vial-preview.png', alt: 'Vialect preview' },
      { src: '/img/vial-full.webp', alt: 'Vialect page preview' },
    ],
  },
  {
    name: 'playtrace',
    summary: 'playtrace is a full-stack, social events hosting app that aims to electrify social circles and allow communities to be explored, candidly, through customizable event pages.',
    techStack: [
      'Nuxt',
      'Strapi',
      'Supabase',
      'Render',
      'Cloudflare',
      'AWS S3'
    ],
    startDate: '2023-08',
    endDate: '2023-11',
    links: {},
    cover: [
      { src: '/img/play-preview.png', alt: 'playtrace preview' },
      { src: '/img/play-full.webp', alt: 'playtrace page preview' },
    ],
    archived: true,
  },
];


function ProjectCard({ project }: { project: Project; }) {
  return (
    <Card className="overflow-hidden p-0 bg-card border-border shadow-md">
      <CardContent className="p-0">
        <div className="relative aspect-video object-cover">
          <img
            src={project.cover[0].src || "/placeholder.svg"}
            alt={project.cover[0].alt || `${project.name} preview`}
          />
        </div>
        <div className="p-6 space-y-4">

          <div className="flex justify-between items-center">
            <div>
              {project.logo
                ? <LogoIcon name={project.logo} className="h-10 w-auto" />
                : <h3 className="font-neuvetica text-2xl text-foreground">{project.name}</h3>
              }
              {project.tagline && <p className="text-sm text-accent font-medium mt-1">{project.tagline}</p>}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {/* {(project.startDate && !project.endDate) && <DateBlock date={project.startDate} />} */}
              <span>
                {formatDate(project.startDate, { format: 'MMM YYYY' })} &ndash; {project.endDate ? formatDate(project.endDate, { format: 'MMM YYYY' }) : 'present'}
              </span>
            </div>
          </div>

          <TechFlex stack={project.techStack} />

          <h4 className="mt-4 font-neuvetica text-lg text-muted-foreground tracking-[0.075em] leading-relaxed text-pretty">
            {project.summary}
          </h4>

          {!project.archived && (
            <div className="flex gap-2 pt-2">
              {project.links.live && (
                <Button size="sm" className="flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  Visit
                </Button>
              )}
              {project.links.demo && (
                <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ExternalLink className="size-4" />
                  Demo
                </Button>
              )}
              {project.links.repo && (
                <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <LogoIcon name="github" className="size-4" />
                  Code
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


export function Projects() {
  return (
    <section className="py-16 max-w-3xl mx-auto">
      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
