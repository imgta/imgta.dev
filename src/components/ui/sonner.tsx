import { useTheme } from "@/components/theme/ThemeProvider";
import { type ToasterProps, Toaster as Sonner } from 'sonner';

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system", systemTheme = "light" } = useTheme();

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
}
