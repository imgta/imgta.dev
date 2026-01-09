export interface MetaConfig {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishDate?: string;
  modifiedDate?: string;
  cssUrl?: string;
}

export const DEFAULT_META = {
  author: 'imgta',
  twitterHandle: '@gta_codes',
  siteName: 'imgta.dev',
  titlePrefix: 'Gordon Ta',
  defaultImage: '/og-image.webp',
  locale: 'en_US',
};

export function createMetaTags({
  title = DEFAULT_META.titlePrefix + ' | Full-Stack Software Engineer',
  description = 'Full-stack Engineer, Co-founder @ Video Blog AI, skilled in React, Nuxt, FastAPI. From biotech labs to browser tabs, I build expressive, AI-powered software to drive impact with creativity.',
  url = import.meta.env.VITE_SITE_URL,
  image = DEFAULT_META.defaultImage,
  type = 'website',
  cssUrl,
  publishDate,
  modifiedDate,
}: MetaConfig) {

  const tags = [
    { title },
    { name: 'description', content: description },
    // { name: 'darkreader-lock' }, // disable darkreader's darkmode

    // open graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: DEFAULT_META.siteName },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '945' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { property: 'og:locale', content: DEFAULT_META.locale },

    // twitter card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: DEFAULT_META.twitterHandle },
    { name: 'twitter:creator', content: DEFAULT_META.twitterHandle },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: title },

    // additional meta
    { name: 'author', content: DEFAULT_META.author },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'en' },
  ];

  // add article-specific meta
  if (type === 'article' && publishDate) {
    tags.push(
      { property: 'article:published_time', content: publishDate },
      { property: 'article:author', content: `https://${DEFAULT_META.siteName}` },
      { property: 'article:section', content: 'Technology' },
      { property: 'article:tag', content: 'Web Development' }
    );

    if (modifiedDate) {
      tags.push({ property: 'article:modified_time', content: modifiedDate });
    }
  }

  const links = [
    { rel: 'canonical', href: url },
    // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    // { rel: 'stylesheet', href: '/fonts/index.css' },

    // any other .css stylesheets passed through
    ...(cssUrl ? [{ rel: 'stylesheet', href: cssUrl }] : [])
  ];

  // const scripts = [
  //   // umami analytics tracker
  //   { defer: true, src: 'https://trace.imgta.dev/script.js', 'data-website-id': 'd62510aa-366a-444c-b7d3-e26f77af6d4d' }
  // ];

  return { meta: tags, links };
}

import { TECHS } from '@/lib/tech';

export const SOCIALS = ['github', 'linkedin', 'instagram'].map(key => TECHS[key]);

export const CONTACTS = [
  {
    label: 'email',
    href: 'mailto:gphamta@gmail.com',
    text: 'google mail',
    ariaLabel: 'Send me an email',
    title: 'Gmail',
  },
  {
    label: 'schedule',
    href: 'https://cal.com/imgta',
    text: 'calendar',
    ariaLabel: 'Schedule a chat with me',
    title: 'Cal.com',
  },
  {
    label: 'connect',
    href: 'https://linkedin.com/in/gordonta',
    text: 'linkedin',
    ariaLabel: 'Connect with me on LinkedIn',
    title: 'LinkedIn',
  },
] as const;