// `next-themes` code reworked for tanstack, adapted from:
// - https://github.com/augiwan/tanstack-theme-kit
// - https://gist.github.com/WellDone2094/16107a2a9476b28a5b394bee3fa1b8a3

import {
  type PropsWithChildren,
  type SetStateAction,
  type ReactNode,
  type Dispatch,
  createContext,
  useEffect,
  useState,
  use,
} from "react";

type ValueObject = {
  [themeName: string]: string;
};

export type UseThemeProps = {
  /** List of all available theme names */
  themes: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string;
  /** Update the theme */
  setTheme: Dispatch<SetStateAction<string>>;
  /** Active theme name */
  theme?: string;
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: "dark" | "light";
};

export type Attribute = `data-${string}` | "class";

export interface ThemeProviderProps extends PropsWithChildren {
  /** List of all available theme names */
  themes?: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string;
  /** Whether to switch between dark and light themes based on prefers-color-scheme */
  enableSystem?: boolean;
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string;
  /** HTML attribute modified based on the active theme. Accepts `class`, `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.), or an array which could include both */
  attribute?: Attribute | Attribute[];
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject;
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string;
}

/** Options serialized into the inline theme bootstrap script. */
export type ThemeScriptOptions = {
  attribute: Attribute | Attribute[];
  storageKey: string;
  defaultTheme: string;
  themes: string[];
  enableSystem: boolean;
  enableColorScheme: boolean;
  forcedTheme?: string;
  value?: ValueObject;
};

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
  setTheme: () => {
    /* no-op */
  },
  themes: [],
};
const defaultThemes = ["light", "dark"];

export function useTheme() {
  return use(ThemeContext) ?? defaultContext;
}

export function ThemeProvider(props: ThemeProviderProps): ReactNode {
  const context = use(ThemeContext);
  if (context) return props.children;

  return <Theme {...props} />;
}

function Theme({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = defaultThemes,
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));

  function applyAttributesToDOM(resolved: string) {
    const attributeList = Array.isArray(attribute) ? attribute : [attribute];
    const attrValues = value ? Object.values(value) : themes;
    const name = value ? value[resolved] : resolved;

    for (const attr of attributeList) {
      if (attr === "class") {
        document.documentElement.classList.remove(...attrValues);
        if (name) document.documentElement.classList.add(name);
      } else if (attr.startsWith("data-")) {
        if (name) document.documentElement.setAttribute(attr, name);
        else document.documentElement.removeAttribute(attr);
      }
    }
  }

  function applyColorScheme(resolved: string) {
    if (!enableColorScheme) return;

    const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
    const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
    document.documentElement.style.colorScheme = colorScheme || "";
  }

  function applyTheme(nextTheme?: string) {
    if (!nextTheme) return;

    const resolved = nextTheme === "system" && enableSystem ? getSystemTheme() : nextTheme;
    const enable = disableTransitionOnChange ? disableAnimation() : null;

    applyAttributesToDOM(resolved);
    applyColorScheme(resolved);

    enable?.();
  }

  function setTheme(newValue: SetStateAction<string>) {
    const newTheme = typeof newValue === "function" ? newValue(theme ?? "") : newValue;
    setThemeState(newTheme);

    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn("[theme] failed to persist to localStorage", error);
    }
  }

  function handleMediaQuery(_event: MediaQueryListEvent | MediaQueryList) {
    if (theme === "system" && enableSystem && !forcedTheme) {
      applyTheme("system");
    }
  }

  useEffect(function listenToSystemPreference() {
    if (isServer) return;

    const media = window.matchMedia(MEDIA);
    // intentionally use deprecated listener methods to support iOS 13 and older browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  });

  useEffect(function syncThemeAcrossTabs() {
    if (isServer) return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      const newTheme = e.newValue || defaultTheme;
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  });

  useEffect(function applyThemeOnChange() {
    applyTheme(forcedTheme ?? theme);
  });

  const providerValue: UseThemeProps = {
    theme,
    setTheme,
    forcedTheme,
    themes: enableSystem ? [...themes, "system"] : themes,
    systemTheme: enableSystem ? (getSystemTheme() as "light" | "dark") : undefined,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          nonce,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeScript({
  forcedTheme,
  storageKey,
  attribute,
  enableSystem,
  enableColorScheme,
  defaultTheme,
  value,
  themes,
  nonce,
}: ThemeScriptOptions & { nonce?: string }) {
  const scriptOptions = JSON.stringify({
    attribute,
    storageKey,
    defaultTheme,
    themes,
    enableSystem,
    enableColorScheme,
    forcedTheme,
    value,
  });

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: needed to inject script before hydration
      dangerouslySetInnerHTML={{
        __html: `(${script.toString()})(${scriptOptions})`,
      }}
      nonce={nonce}
      suppressHydrationWarning
    />
  );
}

function getTheme(key: string, fallback?: string) {
  if (isServer) return fallback;

  let theme: string | undefined;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (error) {
    console.warn("[theme] failed to read from localStorage", error);
  }

  return theme || fallback;
}

function disableAnimation() {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(css);

  return () => {
    window.getComputedStyle(document.body); // force restyle
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function getSystemTheme(e?: MediaQueryList | MediaQueryListEvent) {
  if (isServer) return "light";

  const event = e ?? window.matchMedia(MEDIA);
  const isDark = event.matches;
  return isDark ? "dark" : "light";
}

/** Bootstrap script injected before hydration to prevent theme flash. */
export function script(options: ThemeScriptOptions) {
  const {
    attribute,
    storageKey,
    defaultTheme,
    themes,
    enableSystem,
    enableColorScheme,
    forcedTheme,
    value,
  } = options;

  const el = document.documentElement;
  const systemThemes = ["light", "dark"];
  const attributes = Array.isArray(attribute) ? attribute : [attribute];
  const attrValues = value ? Object.values(value) : themes;

  function applyClassAttr(name?: string) {
    el.classList.remove(...attrValues);
    if (name) el.classList.add(name);
  }

  function applyDataAttr(attr: string, name?: string) {
    if (name) el.setAttribute(attr, name);
    else el.removeAttribute(attr);
  }

  function updateDOM(theme: string) {
    const name = value ? value[theme] : theme;

    for (const attr of attributes) {
      if (attr === "class") applyClassAttr(name);
      else if (attr.startsWith("data-")) applyDataAttr(attr, name);
    }

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (!enableColorScheme) return;

    const fallback = systemThemes.includes(defaultTheme) ? defaultTheme : null;
    const colorScheme = systemThemes.includes(theme) ? theme : fallback;
    el.style.colorScheme = colorScheme || "";
  }

  function resolveSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (forcedTheme) {
    const resolvedForcedTheme =
      forcedTheme === "system" && enableSystem ? resolveSystemTheme() : forcedTheme;
    updateDOM(resolvedForcedTheme);
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme;
      const isSystem = enableSystem && themeName === "system";
      const theme = isSystem ? resolveSystemTheme() : themeName;
      updateDOM(theme);
    } catch (error) {
      // pre-hydration inline script — consola unavailable
      console.warn("[theme] localStorage unavailable", error);
      updateDOM(enableSystem && defaultTheme === "system" ? resolveSystemTheme() : defaultTheme);
    }
  }
}
