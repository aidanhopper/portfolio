import React, { useState } from 'react';

export interface NavItem {
  route: string;
  label: string;
}

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  personalName: string;
  navItems: NavItem[];
  avatarUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  personalName,
  navItems,
  avatarUrl,
}) => {
  // Try /avatar.png first, fallback to /avatar.jpg, then fallback to initials "AH"
  const [avatarSrc, setAvatarSrc] = useState<string>(avatarUrl || '/avatar.png');
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (avatarSrc === '/avatar.png') {
      setAvatarSrc('/avatar.jpg');
    } else if (avatarSrc === '/avatar.jpg') {
      setAvatarSrc('/avatar.jpeg');
    } else if (avatarSrc === '/avatar.jpeg') {
      setAvatarSrc('/avatar.webp');
    } else {
      setImageError(true);
    }
  };

  return (
    <aside className="md:w-[200px] md:shrink-0 -mx-4 md:mx-0 md:px-0">
      <div className="lg:sticky lg:top-24 space-y-6">
        {/* Logo Initials / Larger Avatar Picture with Crisp Black/White Border */}
        <div className="px-4 md:px-0 mb-6 md:mb-10 flex items-center justify-between md:flex-col md:items-start">
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/about');
            }}
            className="flex items-center justify-center w-14 h-14 md:w-32 md:h-32 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-sans font-bold text-lg md:text-xl tracking-wider hover:opacity-90 transition-opacity overflow-hidden shrink-0 border-2 border-zinc-900 dark:border-zinc-100 shadow-md"
            aria-label="Home"
          >
            {!imageError ? (
              <img
                src={avatarSrc}
                alt={personalName}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            ) : (
              "AH"
            )}
          </a>
        </div>

        {/* Mobile Title */}
        <h1 className="font-sans font-semibold uppercase tracking-wider text-base px-4 md:hidden text-zinc-900 dark:text-zinc-100">
          {personalName}
        </h1>

        {/* Dynamic Navigation List */}
        <nav
          className="flex flex-row md:flex-col items-start overflow-x-auto px-4 md:px-0 pb-3 md:pb-0 scrollbar-none"
          id="nav"
        >
          <div className="flex flex-row md:flex-col space-x-6 md:space-x-0 md:space-y-2 font-sans text-base">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <div
                  key={item.route}
                  className="flex flex-col-reverse md:flex-row items-center py-1 cursor-pointer group"
                  onClick={() => onNavigate(item.route)}
                >
                  {/* Active Light-Blue Dot Indicator */}
                  <div
                    className={`md:relative rounded-full md:mr-3 w-2 h-2 mt-1 md:mt-0 transition-all duration-200 ${isActive
                      ? 'bg-sky-400 dark:bg-sky-400 scale-100 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                      : 'bg-transparent scale-0 group-hover:scale-75 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600'
                      }`}
                  />
                  <span
                    className={`transition-colors duration-150 ${isActive
                      ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-900 dark:text-zinc-100 hover:text-sky-500 dark:hover:text-sky-400 font-medium'
                      }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};
