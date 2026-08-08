import React from 'react';

export const title = "About";
export const order = 1;

/** Helper to parse **bold** tags cleanly in string paragraphs with crisp bold weight */
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

export default function AboutPage({ onNavigateToProjects }: { onNavigateToProjects?: () => void }) {
  const paragraphs = [
    "Hi! I'm Aidan 👋",
    "I'm a software developer at **IBM** working on **Storage Scale System** test infrastructure, focusing on cluster performance, virtualization, and automated testing platforms.",
    "My work spans the full infrastructure stack, from **bare metal** and hypervisor configuration to CI platform-independent pipelines in **Ansible**. I author pipelines using a custom **YAML DSL** I built, which has been adopted org-wide to automate multi-node cluster builds, regression testing, and continuous deployment workflows.",
    "I also engineer runtime tooling that enables **AI agents** to autonomously interact with live Storage Scale clusters for automated root cause analysis and cluster management.",
    "Previously, I built automated bare-metal testing infrastructure at **SEL**. Currently, I am pursuing an M.S. in Computer Science at **Georgia Tech**, holding a B.S. in Computer Science from **Washington State University**.",
  ];

  return (
    <section id="about" className="space-y-6">
      {/* Prose Body */}
      <div className="space-y-5 font-serif text-lg sm:text-[19px] leading-relaxed text-zinc-900 dark:text-zinc-100">
        {paragraphs.map((pText, idx) => (
          <p key={idx}>{formatText(pText)}</p>
        ))}
      </div>

      {/* CTA Button */}
      {onNavigateToProjects && (
        <div className="pt-4 text-base font-sans text-zinc-900 dark:text-zinc-100">
          <span>Want to see what I'm building on my own time? </span>
          <button
            onClick={onNavigateToProjects}
            className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            Check out my featured projects →
          </button>
        </div>
      )}
    </section>
  );
}
