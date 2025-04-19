'use client';

// import Image from 'next/image';
import Sidebar from '@/components/Sidebar/Sidebar';
import '../globals.css';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen max-w-screen overflow-hidden pt-10 bg-black/40">
      {/* Sidebar and home-section must be siblings */}
      <Sidebar />

      <section className="home-section flex-1 overflow-y-auto bg-black/0 px-6">
        {children}
      </section>
    </div>
  );
}