import { useTheme } from '@/components/theme/ThemeProvider';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const inDarkMode = theme === 'dark';
  const inLightMode = !theme || !inDarkMode; // light, system, or undefined

  function toggleTheme() {
    if (inLightMode) setTheme('dark');
    else setTheme('light');
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      title={inLightMode ? 'Toggle dark mode' : 'Toggle light mode'}
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-gt-500 dark:hover:text-gt-500 size-4.5 py-3"
      onClick={toggleTheme}
    >
      {inLightMode && // show moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <g>
              <path strokeDasharray="2" strokeDashoffset="4" d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.1s" values="4;2" />
              </path>
              <path strokeDasharray="2" strokeDashoffset="4" d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.05s" dur="0.1s" values="4;2" />
              </path>
              <set fill="freeze" attributeName="opacity" begin="0.05s" to="0" />
            </g>
            <path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0">
              <set fill="freeze" attributeName="opacity" begin="0.05s" to="0.75" />
            </path>
          </g>
          <mask id="crescent">
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <circle cx="12" cy="12" r="4">
              <animate fill="freeze" attributeName="r" begin="0.05s" dur="0.1s" values="4;8" />
            </circle>
            <circle cx="22" cy="2" r="3" fill="currentColor">
              <animate fill="freeze" attributeName="cx" begin="0.05s" dur="0.1s" values="22;18" />
              <animate fill="freeze" attributeName="cy" begin="0.05s" dur="0.1s" values="2;6" />
              <animate fill="freeze" attributeName="r" begin="0.05s" dur="0.1s" values="3;12" />
            </circle>
            <circle cx="22" cy="2" r="1">
              <animate fill="freeze" attributeName="cx" begin="0.05s" dur="0.1s" values="22;18" />
              <animate fill="freeze" attributeName="cy" begin="0.05s" dur="0.1s" values="2;6" />
              <animate fill="freeze" attributeName="r" begin="0.05s" dur="0.1s" values="1;10" />
            </circle>
          </mask>
          <circle cx="12" cy="12" r="6" mask="url(#crescent)" fill="currentColor">
            <animate fill="freeze" attributeName="r" begin="0.05s" dur="0.1s" values="6;10" />
            <set fill="freeze" attributeName="opacity" begin="0.05s" to="0.75" />
          </circle>
        </svg>
      }

      {inDarkMode && // show sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g id="rays" fill="none" stroke="currentColor" strokeDasharray="2" strokeDashoffset="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
              <animate fill="freeze" attributeName="d" begin="0.3s" dur="0.1s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.1s" values="2;0" />
            </path>
            <path d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
              <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.1s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.1s" values="2;0" />
            </path>
          </g>
          <mask id="orb">
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <circle cx="12" cy="12" r="8">
              <animate fill="freeze" attributeName="r" begin="0.1s" dur="0.05s" values="8;4" />
            </circle>
            <circle cx="18" cy="6" r="12" fill="currentColor">
              <animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.05s" values="18;22" />
              <animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.05s" values="6;2" />
              <animate fill="freeze" attributeName="r" begin="0.1s" dur="0.05s" values="12;3" />
            </circle>
            <circle cx="18" cy="6" r="10">
              <animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.05s" values="18;22" />
              <animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.05s" values="6;2" />
              <animate fill="freeze" attributeName="r" begin="0.1s" dur="0.05s" values="10;1" />
            </circle>
          </mask>
          <circle cx="12" cy="12" r="10" mask="url(#orb)" opacity="0" fill="currentColor">
            <animate fill="freeze" attributeName="r" begin="0.1s" dur="0.1s" values="10;6" />
            <set fill="freeze" attributeName="opacity" begin="0.05s" to="1" />
          </circle>
          {/* moon fade out */}
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z">
            <set fill="freeze" attributeName="opacity" begin="0.05s" to="0" />
          </path>
        </svg>
      }
    </Button>
  );
}