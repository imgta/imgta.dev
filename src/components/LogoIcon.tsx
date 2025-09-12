import { cloneElement } from 'react';
import { TECHS } from '@/lib/tech';

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function LogoIcon({ name, ...props }: LogoIconProps) {
  const key = name
    .replace(/^aws\s+/i, '')  // strip leading 'AWS'
    .replace(/[\s.]+/g, '')   // remove whitespace, periods
    .toLowerCase();

  const tech = TECHS[key];
  if (!tech) return null;

  return cloneElement(tech.icon, { ...props });
}
