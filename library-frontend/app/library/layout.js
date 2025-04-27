'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaHome, FaBook, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

export default function LibraryLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <html lang="en" className="dark">
            <body className="bg-gray-900 text-white">
                {/* Navbar */}
                <header className="bg-gray-800 p-4 fixed top-0 w-full z-50 shadow-md">
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
                    <aside className="bg-gray-800 text-white w-64 p-6 fixed top-0 left-0 h-full z-50 shadow-lg">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-right w-full text-xl mb-4"
                        >
                            ×
                        </button>
                        <nav className="space-y-4">
                            <a
                                href="/"
                                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition"
                            >
                                <FaHome />
                                <span>Home</span>
                            </a>
                            <a
                                href="/library"
                                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition"
                            >
                                <FaBook />
                                <span>Library</span>
                            </a>
                            <a
                                href="/about"
                                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition"
                            >
                                <FaInfoCircle />
                                <span>About</span>
                            </a>
                            <a
                                href="/contact"
                                className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition"
                            >
                                <FaEnvelope />
                                <span>Contact</span>
                            </a>
                        </nav>
                    </aside>
                )}

                {/* Main Content */}
                <main className="mt-16 md:mt-20 p-6 md:p-10 bg-gray-100 rounded-lg shadow-md">
                    {children}
                </main>
            </body>
        </html>
    );
}