import React from 'react';
import { Mail, Github, Youtube, Linkedin } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface FooterProps {
  personal: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ personal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 sm:mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-sans text-zinc-900 dark:text-zinc-100">
      <div>
        © {currentYear} {personal.name}. All rights reserved.
      </div>

      <div className="flex items-center space-x-5">
        {personal.email && (
          <a
            href={personal.email}
            className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            title="Send Email"
            aria-label="Email"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        )}

        {personal.github && (
          <a
            href={personal.github}
            className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            title="GitHub Profile"
            aria-label="GitHub"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
        )}

        {personal.youtube && (
          <a
            href={personal.youtube}
            className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            title="YouTube Channel"
            aria-label="YouTube"
          >
            <Youtube className="w-4.5 h-4.5" />
          </a>
        )}

        {personal.linkedin && (
          <a
            href={personal.linkedin}
            className="text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
        )}
      </div>
    </footer>
  );
};
