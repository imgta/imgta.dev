import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface HighlightLinkProps
  extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'asChild'>,
  Pick<AnchorProps, 'href' | 'target' | 'rel' | 'title' | 'aria-label'> {
}

export function HighlightLink({
  className,
  size = 'sm',
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  children,
  ...buttonProps
}: HighlightLinkProps) {
  return (
    <Button
      {...buttonProps}
      asChild
      size={size}
      variant="link"
      className={cn(
        'flex justify-start p-0 hover:no-underline',
        className
      )}
    >
      <a href={href} target={target} rel={rel}>
        <span className="relative">
          <mark
            className="group bg-transparent hover:before:bg-amber-100/75
          before:absolute before:-inset-x-1.5 before:-inset-y-0.5 before:z-0"
          >
            <span className={cn(
              'font-semibold group-hover:opacity-90 before:z-[1]',
              // 'group-hover:blur-[0.025em]',
            )}>
              {children}
            </span>
          </mark>
        </span>
      </a>
    </Button>
  );
}
