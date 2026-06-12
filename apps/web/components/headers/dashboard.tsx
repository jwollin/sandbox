import React from 'react';
import {
  Cthulhu,
  DashboardNavigation,
  NotificationMenu,
  ProfileMenu,
} from '@buick/components';

export default async function Dashboard() {
  return (
    <header className="relative w-full bg-gray-900 border-b">
      <div className="text-olive-500 py-2">
        <div className="container mx-auto px-3 flex justify-between">
          <div className="flex gap-2 items-center justify-content">
            <Cthulhu width={30} height={30} />
            <h1 className="font-bold">Dashboard</h1>
            <DashboardNavigation className="ml-3" />
          </div>
          <div className="flex gap-1">
            <NotificationMenu />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Dashboard, Dashboard as Header };
