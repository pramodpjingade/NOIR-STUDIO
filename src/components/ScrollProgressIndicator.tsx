import React from 'react';

interface ScrollProgressIndicatorProps {
  progress: number;
  activeSection: string;
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  progress,
  activeSection,
}) => {
  const sections = [
    { id: 'hero', label: '01. Intro', href: '#' },
    { id: 'works', label: '02. Works', href: '#works' },
    { id: 'capabilities', label: '03. Practice', href: '#capabilities' },
    { id: 'philosophy', label: '04. Manifesto', href: '#philosophy' },
    { id: 'metrics', label: '05. Impact', href: '#metrics' },
  ];

  return (
    <aside
      aria-label="3D Scroll Navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-4 select-none pointer-events-auto"
    >
      {/* Vertical Progress Spine */}
      <div className="relative w-[1px] h-32 bg-neutral-900 ml-1.5 overflow-hidden">
        <div
          style={{ height: `${Math.round(progress * 100)}%` }}
          className="w-full bg-white transition-all duration-150 ease-out"
        />
      </div>

      {/* Section Indicators */}
      <nav className="flex flex-col gap-2.5">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={sec.href}
              className={`group flex items-center gap-2.5 text-[11px] font-mono tracking-wider uppercase transition-colors duration-200 ${
                isActive ? 'text-white font-medium' : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-white scale-125'
                    : 'bg-neutral-800 group-hover:bg-neutral-600'
                }`}
              />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {sec.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
