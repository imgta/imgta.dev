import { cloneElement } from 'react';
import { TECHS } from '@/lib/tech';

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function LogoIcon({ name, ...props }: LogoIconProps) {
  const key = name
    .replace(/[\s.]+/g, '') // remove whitespaces and periods
    .toLowerCase();

  const def = TECHS[key];
  if (!def) return null;

  return cloneElement(def.icon, { ...props });

}
