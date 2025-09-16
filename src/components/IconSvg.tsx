import { cloneElement } from 'react';
import { TECHS } from '@/lib/tech';

export interface IconSvgProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function IconSvg({ name, ...props }: IconSvgProps) {
  const key = name
    .replace(/^aws\s+/i, '')  // strip leading 'AWS'
    .replace(/[\s.]+/g, '')   // remove whitespace, periods
    .toLowerCase();

  const tech = TECHS[key];
  if (!tech) return null;

  return cloneElement(tech.icon, { ...props });
}

export function ExternalLink(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.825" d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5" /></svg>;
}

export function LiveLink(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M20.94 13.045A9 9 0 1 0 11.987 21M3.6 9h16.8M3.6 15H13" /><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.529 10.294M16 22l5-5m0 4.5V17h-4.5" /></g></svg>;
}

export function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>;
}