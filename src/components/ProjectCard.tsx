import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { LogoIcon } from "@/components/LogoIcon";

type Project = {
  name: string;
  summary: string;
  tech: string[];
  period: { start: string; end?: string; };
  links?: { live?: string; demo?: string; repo?: string; };
  cover: { webp?: string; png: string; alt: string; };
  feature?: boolean;
};

function formatPeriod(p: Project['period']) {
  const fmt = (s?: string) => {
    if (!s) return '';
    const [y, m] = s.split('-');
    return new Date(Number(y), Number(m ?? '1') - 1, 1).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  const a = fmt(p.start), b = fmt(p.end);
  return p.end && p.end !== p.start ? `${a} — ${b}` : a;
}

function RepoIcon({ url }: { url?: string; }) {
  if (!url) return null;
  const host = new URL(url).host;

  if (host.includes('github')) return <LogoIcon name="github" className="size-4" aria-hidden />;
  if (host.includes('gitlab')) return <LogoIcon name="gitlab" className="size-4" aria-hidden />;
}

export function ProjectCard({ p }: { p: Project; }) {
  const liveHref = p.links?.live || p.links?.demo;
  return (
    <Card className="overflow-hidden border border-border/60">
      <div className="grid gap-0 lg:grid-cols-2">
        {/* cover */}
        <div className="bg-muted/30">
          <AspectRatio ratio={16 / 12}>
            <picture>
              {p.cover.webp && <source srcSet={p.cover.webp} type="image/webp" />}
              <img
                loading="lazy"
                src={p.cover.png}
                alt={p.cover.alt}
                className="h-full w-full object-cover"
              />
            </picture>
          </AspectRatio>
        </div>

        {/* content */}
        <div className="flex flex-col">
          <CardHeader className="space-y-1">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-2xl leading-tight">{p.name}</CardTitle>
              <CardDescription className="whitespace-nowrap font-mono">{formatPeriod(p.period)}</CardDescription>
            </div>
            <CardDescription className="text-base leading-relaxed">{p.summary}</CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="mb-3 flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="font-normal">{t}</span>
              ))}
            </div>

          </CardContent>

          <CardFooter className="mt-auto flex items-center gap-3">
            {liveHref && (
              <Button asChild size="sm">
                <a href={liveHref} target="_blank" rel="noreferrer">
                  Live
                </a>
              </Button>
            )}
            {p.links?.repo && (
              <Button asChild variant="outline" size="sm">
                <a href={p.links.repo} target="_blank" rel="noreferrer">
                  <RepoIcon url={p.links.repo} />
                  <span className="ml-2">Code</span>
                </a>
              </Button>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
