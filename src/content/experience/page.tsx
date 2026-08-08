import React from 'react';

export const title = "Experience";
export const order = 2;

export interface JobItem {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
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

const jobs: JobItem[] = [
  {
    company: "IBM",
    role: "Software Developer",
    location: "Tucson, AZ",
    period: "June 2025 - Present",
    summary: "Building cluster virtualization platforms, custom Terraform/Ansible automation runners, and shell orchestration tooling.",
    highlights: [
      "Reduced lab-wide client cluster hardware requirements by **89%** through QEMU/KVM virtualization with SR-IOV PCI passthrough, while improving I/O throughput **3x** by fully utilizing Nvidia ConnectX card bandwidth.",
      "Paired virtualization with end-to-end deployment automation using a custom Terraform runner and Ansible, covering VM provisioning, Storage Scale installation, RDMA setup, and I/O initialization, reducing cluster rebuilds from **several hours to minutes**.",
      "Built a custom Ansible runner with its own YAML DSL for defining pipelines, evolving into a unified platform for running tests, regressions, cluster deployment, maintenance, and configuration adopted org-wide.",
      "Built a custom Terraform runner adopted org-wide to deploy large-scale clusters spanning multiple bare-metal systems and **100+ VMs**, dynamically passing through virtual functions.",
      "Engineered a Python library that controls any vanilla tmux session with zero setup, parsing prior commands/output and letting AI agents take over a user's shell on demand to run diagnostics.",
    ],
    technologies: [
      "Python",
      "QEMU/KVM",
      "Ansible",
      "Terraform",
      "Linux/RHEL",
      "SR-IOV",
      "RDMA",
      "tmux",
      "Go",
    ],
  },
  {
    company: "SEL",
    role: "Application Engineering Intern",
    location: "Pullman, WA",
    period: "Aug 2023 - May 2025",
    summary: "Engineered bare-metal automated deployment systems and hardware testing automation.",
    highlights: [
      "Developed an automated platform deployment system using Python, iPXE, Tiny Core Linux, and QEMU/KVM for deploying custom images to bare metal, enabling remote automated testing without manual intervention.",
      "Reduced per-block test time **6x** in an internal SSD validation tool, significantly cutting full-drive test duration.",
      "Designed and implemented SEL NIC driver packaging automation for the Proxmox kernel for pre-release testing and support.",
    ],
    technologies: [
      "Python",
      "iPXE",
      "Tiny Core Linux",
      "QEMU/KVM",
      "Proxmox",
      "Bash",
      "SSD Automation",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <section id="experience" className="space-y-12">
      <div className="space-y-12">
        {jobs.map((job, idx) => (
          <article key={idx} className="space-y-3.5 group">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                  {job.role} <span className="text-zinc-900 dark:text-zinc-100 font-normal">@</span> {job.company}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">{job.location}</p>
              </div>
              <span className="font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 shrink-0">
                {job.period}
              </span>
            </div>

            {job.summary && (
              <p className="font-serif text-lg sm:text-[19px] text-zinc-900 dark:text-zinc-100 leading-relaxed">
                {formatText(job.summary)}
              </p>
            )}

            {job.highlights && job.highlights.length > 0 && (
              <ul className="space-y-2 list-disc list-outside ml-5 font-serif text-lg sm:text-[19px] text-zinc-900 dark:text-zinc-100">
                {job.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="leading-relaxed">
                    {formatText(highlight)}
                  </li>
                ))}
              </ul>
            )}

            {job.technologies && job.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {job.technologies.map((tech, tIdx) => (
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
