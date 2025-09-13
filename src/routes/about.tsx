import { createFileRoute } from '@tanstack/react-router';
import { createMetaTags } from '@/utils/meta';
import { TechFlex } from '@/components/TechStack';

export const Route = createFileRoute('/about')({
  head: () => createMetaTags({
    title: 'About Me',
    description: 'Learn more about me.',
  }),
  component: About,
});

const stack = [
  'React', 'Next.js', 'Vue.js', 'Nuxt',
  'Node.js', 'Vite', 'Hono',
  'Python', 'FastAPI', 'Django', 'Streamlit',
  'JavaScript', 'TypeScript',
  'HTML', 'CSS', 'Tailwind CSS'
];

const stack2 = [
  'Shopify', 'Strapi', 'Stripe', 'AWS EC2', 'Django', 'JavaScript', 'TypeScript',
  'NGINX', 'Cloudflare', 'Oracle', 'Vercel', 'Render',
  'Supabase', 'Drizzle', 'Neon', 'PostgreSQL', 'SQLite',
  'Nuxt', 'Cloudflare', 'Oracle', 'Streamlit', 'Chroma',
];

const stack3 = [
  'Nootrient',
  'FFMPEG',
];

function About() {
  return (
    <>
      <TechFlex stack={stack} iconClass="size-12" />
      <TechFlex stack={stack2} iconClass="size-12" />
      <div className="flex justify-center my-8"><TechFlex stack={stack3} iconClass="size-36" /></div>

    </>
  );
}