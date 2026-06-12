import React from 'react';

export default function Navigation({ className = '' }: { className?: string }) {
  return (
    <nav className={`flex ${className}`}>
      <a
        href="#"
        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
      >
        Projects
      </a>
      <a
        href="#"
        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
      >
        Calendar
      </a>
    </nav>
  );
}

export { Navigation, Navigation as DashboardNavigation };
