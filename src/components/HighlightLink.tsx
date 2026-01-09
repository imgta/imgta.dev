import { Link, type LinkProps } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface HighlightLinkProps extends
  Omit<React.ComponentProps<typeof Button>, 'variant' | 'asChild'>,
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'title' | 'aria-label'>,
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
        className="bg-transparent group-hover:before:bg-amber-100/75 dark:group-hover:before:bg-amber-100/60
        text-gt-700 group-hover:text-content-900 dark:text-content-400 dark:group-hover:text-content-100
        before:absolute before:-inset-x-2 before:-inset-y-1 before:-z-1 group-hover:before:z-0
        transition-[background-color,color]"
      >
        <span className="group-hover:opacity-99">
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
      className={cn('flex justify-start p-0 hover:no-underline h-fit', className)}
    >
      {
        to
          ? <Link to={to}>{content}</Link>
          : <a href={href} target={target} rel={rel}>{content}</a>
      }
    </Button>
  );
}
