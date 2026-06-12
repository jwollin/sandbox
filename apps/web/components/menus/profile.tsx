'use client';

import React, { useState } from 'react';

export default function ProfileMenu({ className }: { className?: string }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <nav className={className}>
      <button
        onClick={() => setShow(!show)}
        className="relative flex size-8 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-gray-100 outline -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        JW
      </button>
      {show && (
        <ul className="absolute w-45 rounded-md bg-gray-800 py-1 outline right-4/48 z-20 top-5/12 -outline-offset-1 outline-white/10 transition transition-discrete">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden hover:bg-gray-900"
          >
            Your profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden hover:bg-gray-900"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden hover:bg-gray-900"
          >
            Sign out
          </a>
        </ul>
      )}
    </nav>
  );
}

export { ProfileMenu };
