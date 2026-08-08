import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export const title = "Projects";
export const order = 4;

export interface ProjectItem {
  title: string;
  oneLiner: string;
  description?: string;
  highlights?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

/** Helper to parse **bold** and `code` tags cleanly in string bullet points */
function formatText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-zinc-900 dark:text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const projects: ProjectItem[] = [
  {
    title: "Gateway",
    oneLiner: "Dynamic, protocol-aware connection multiplexer and reverse proxy daemon in Go.",
    description: "Built to eliminate homelab workflow friction, Gateway lets you expose, proxy, or redirect any service in a single command with zero setup ceremony. Powered by a custom dynamic listener backend, it inspects incoming connections to multiplex HTTP, HTTPS, TCP, UDP, and Minecraft traffic across shared ports with zero config file editing.",
    featured: true,
    githubUrl: "/github/gateway",
    technologies: [
      "Go",
      "SQLite",
      "REST API"
    ],
    highlights: [
      "**Dynamic Route & Listener Backend**: Built a custom, fully dynamic listener backend in Go that dynamically attaches, detaches, and reconfigures network ports and protocol handlers at runtime without process restarts or dropping active connections - a unique architecture in Go networking libraries.",
      "**Frictionless Speed**: Expose or redirect any local service in a single command `gateway serve https example.com/service internal-service:3000` with zero config editing, zero restarts, and instant dynamic API registration.",
      "**Pangolin-Style HTTPS Auth**: Protect self-hosted HTTPS endpoints with instant proxy authentication middleware `gateway serve https app.example.com 3000 --auth`.",
      "**Non-Destructive Protocol & SNI Peeking**: Peeks at TLS `ClientHello` packets to route by SNI without terminating encryption, and parses Minecraft handshake/login packets to multiplex multiple game servers on a single port by domain name.",
      "**Operational & Ephemeral UX**: Native support for auto-expiring ephemeral mounts, background daemon execution, and live log streaming.",
      "**Automated TLS & Optional Host Firewall Management**.",
      "**Single Binary**: Pure Go architecture using embedded SQLite database.",
    ],
  },
  {
    title: "Portfolio Site",
    oneLiner: "Developer Portfolio showcasing my projects, experience, and technical blog content, built with Vite React and TypeScript page routing.",
    featured: false,
    githubUrl: "/github/portfolio",
    technologies: ["TypeScript", "React", "Vite", "Tailwind CSS"],
  },
];

export default function ProjectsPage() {
  return (
    <section id="projects" className="space-y-12">
      <div className="space-y-12">
        {projects.map((project, idx) => (
          <article key={idx} className="space-y-3.5 group">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                {project.title}
              </h3>

              <div className="flex items-center gap-3.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                    title="View Source on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                    title="Visit Live Site"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <p className="font-serif text-lg sm:text-[19px] text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal">
              {formatText(project.oneLiner)}
            </p>

            {project.description && (
              <div className="font-serif text-lg sm:text-[19px] text-zinc-900 dark:text-zinc-100 leading-relaxed">
                {formatText(project.description)}
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-2 list-disc list-outside ml-5 font-serif text-lg sm:text-[19px] text-zinc-900 dark:text-zinc-100">
                {project.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="leading-relaxed">
                    {formatText(highlight)}
                  </li>
                ))}
              </ul>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
