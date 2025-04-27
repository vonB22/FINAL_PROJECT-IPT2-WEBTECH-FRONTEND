'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import '../globals.css';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden ml-0 pl-0 bg-zinc-900">
      <Sidebar />

      <section className="home-section flex-1 overflow-y-auto bg-transparent px-0 mx-0">
        {children}
      </section>
    </div>
  );
}