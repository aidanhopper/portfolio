import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Sidebar, NavItem } from './components/Sidebar';
import { Footer } from './components/Footer';
import { loadFileSystemRoutes } from './utils/routerLoader';

export function App() {
  // Load dynamic file-system routes from src/content/**/page.tsx
  const allRoutes = loadFileSystemRoutes();

  // Helper to normalize path (e.g. '/' -> '/about')
  const normalizePath = (path: string) => {
    if (path === '/' || path === '') return '/about';
    return path.replace(/\/$/, '');
  };

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/about';
  });

  // Redirect root '/' to '/about' in browser history & address bar
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      window.history.replaceState(null, '', '/about');
    }
  }, []);

  // Listen for browser back / forward button navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatically scroll window to top whenever current route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [currentRoute]);

  // Handle URL navigation with history.pushState
  const navigateTo = (route: string) => {
    const targetPath = normalizePath(route);
    setCurrentRoute(targetPath);
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  // Theme state: default to localStorage or system preference, with manual toggle
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Find active route definition
  const activeRouteDef = allRoutes.find((r) => r.route === currentRoute) || allRoutes.find((r) => r.route === '/about') || allRoutes[0];
  const ActiveComponent = activeRouteDef.Component;

  // Derive dynamic navigation items from discovered routes
  const navItems: NavItem[] = allRoutes.map((r) => ({
    route: r.route,
    label: r.title,
  }));

  const personalName = 'Aidan Hopper';
  const footerPersonal = {
    name: personalName,
    title: 'Software Developer @ IBM',
    location: 'Tucson, AZ',
    email: 'mailto:aidanhop1@gmail.com',
    github: '/github',
    youtube: '/youtube',
    linkedin: '/linkedin',
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 flex flex-col">
      {/* Top-Right Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 md:top-12 md:right-12 p-2 rounded-full text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-white" />
        ) : (
          <Moon className="w-5 h-5 text-zinc-900" />
        )}
      </button>

      <div className="w-full max-w-5xl flex-1 flex flex-col md:flex-row px-4 pt-8 md:pt-16 lg:pt-24 mx-auto pb-12">
        {/* Left Sidebar with Dynamic Nav Items */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          personalName={personalName}
          navItems={navItems}
        />

        {/* Main Content Area */}
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            {/* Header Name (Medium Bold Sans Heading) */}
            <h1 className="mb-8 font-sans font-bold text-2xl sm:text-3xl tracking-tight hidden md:block text-zinc-900 dark:text-zinc-100">
              <button
                onClick={() => navigateTo('/about')}
                className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer text-left"
              >
                {personalName}
              </button>
            </h1>

            {/* Active Route Renderer */}
            <div className="max-w-2xl">
              <ActiveComponent onNavigateToProjects={() => navigateTo('/projects')} />
            </div>
          </div>

          {/* Footer */}
          <div className="max-w-2xl w-full">
            <Footer personal={footerPersonal} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
