'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function LibraryLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <html lang="en" className="dark">
            <body className="bg-gray-900 text-white">
                {/* Navbar */}
                <header className="bg-gray-800 p-2 fixed top-0 w-full z-50">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="logo flex items-center space-x-1 italic">
                                <Image src="/img/logo.png" width={53} height={48} alt="Logo" />
                                <span className="text-white text-2xl font-bold">
                                    G3<span className="text-yellow-500 text-2xl font-bold">LMS</span>
                                </span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center w-full max-w-md mx-4 relative">
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full px-4 py-2 pr-10 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            />
                            <button
                                className="absolute right-3 text-gray-400 hover:text-yellow-500"
                                onClick={() => alert('Search triggered!')}
                            >
                                <FiSearch className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Burger Icon */}
                        <div className="ml-4 md:hidden">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-white focus:outline-none"
                            >
                                <div className="space-y-1">
                                    <div className="w-5 h-0.5 bg-white" />
                                    <div className="w-5 h-0.5 bg-white" />
                                    <div className="w-5 h-0.5 bg-white" />
                                </div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Sidebar */}
                {sidebarOpen && (
                    <aside className="bg-gray-800 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 shadow-lg">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-right w-full text-xl mb-4"
                        >
                            ×
                        </button>
                        <p>Sidebar content</p>
                    </aside>
                )}

                <main className="mt-10 p-[80px] bg-white/90">{children}</main>
            </body>
        </html>
    );
}