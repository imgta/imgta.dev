import { Button } from '@/components/ui/button';
import { Link, type LinkProps } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export interface HighlightLinkProps
  extends Omit<React.ComponentProps<typeof Button>,
    'variant' | 'asChild'
  >,
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'rel' | 'title' | 'aria-label'
  >,
  Pick<LinkProps, 'to' | 'hash' | 'activeProps'> { }

export function HighlightLink({
  className,
  size = 'sm',
  to,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  children,
  ...buttonProps
}: HighlightLinkProps) {

  const content = (
    <span className="relative">
      <mark
        className="group bg-transparent hover:before:bg-amber-100/75 dark:hover:before:bg-amber-100/60
                  text-gt-700 hover:text-content dark:text-content-400 dark:hover:text-content-50
                  before:absolute before:-inset-x-2 before:-inset-y-0.5 before:-z-1"
      >
        <span className="group-hover:opacity-95 before:z-1">
          {children}
        </span>
      </mark>
    </span>
  );

  return (
    <Button
      {...buttonProps}
      asChild
      size={size}
      variant="link"
      className={cn('flex justify-start px-0 py-1 hover:no-underline h-fit', className)}
    >
      {
        to
          ? <Link to={to}>{content}</Link>
          : <a href={href} target={target} rel={rel}>{content}</a>
      }
    </Button>
  );
}
