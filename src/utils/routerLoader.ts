import React from 'react';

export interface RouteDefinition {
  route: string;
  title: string;
  order: number;
  Component: React.ComponentType<{ onNavigateToProjects?: () => void }>;
}

// Vite eager glob to discover all page.tsx files dynamically
const pageModules = import.meta.glob('/src/content/**/page.tsx', {
  eager: true,
}) as Record<string, { default: React.ComponentType<any>; title?: string; order?: number }>;

export function loadFileSystemRoutes(): RouteDefinition[] {
  const routes: RouteDefinition[] = [];

  for (const filePath in pageModules) {
    const mod = pageModules[filePath];

    // Convert file path to URL route:
    // /src/content/about/page.tsx -> /about
    // /src/content/page.tsx -> /
    let route = filePath
      .replace('/src/content', '')
      .replace('/page.tsx', '');

    if (route === '') {
      route = '/';
    }

    routes.push({
      route,
      title: mod.title || route.replace('/', ''),
      order: mod.order ?? 99,
      Component: mod.default,
    });
  }

  // Sort routes by 'order' export
  routes.sort((a, b) => a.order - b.order);

  return routes;
}
