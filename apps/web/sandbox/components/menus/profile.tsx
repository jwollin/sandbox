'use client';

import React, { useState } from 'react';

export default function ProfileMenu({ className }: { className?: string }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <nav>
      <button
        onClick={() => setShow(!show)}
        className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
        />
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
