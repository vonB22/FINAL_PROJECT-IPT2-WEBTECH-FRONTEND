"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiGrid, FiMenu, FiUsers, FiBook, FiSettings, FiGlobe, FiMessageSquare, FiRepeat, FiSun, FiMoon, FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }) {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);
    const activePath = usePathname();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const pathSegments = activePath.split("/").filter((segment) => segment);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="relative flex w-full flex-col md:flex-row">
            {/* Skip to main content link */}
            <a className="sr-only" href="#main-content">
                Skip to the main content
            </a>

            {/* Dark overlay for sidebar on smaller screens */}
            {sidebarIsOpen && (
                <div
                    className="fixed inset-0 z-20 bg-neutral-950/10 backdrop-blur-xs md:hidden"
                    aria-hidden="true"
                    onClick={() => setSidebarIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <nav
                className={`fixed left-0 z-30 flex h-screen w-60 shrink-0 flex-col border-r p-4 transition-transform duration-300 md:w-64 md:translate-x-0 md:relative border-neutral-700 bg-neutral-900 ${sidebarIsOpen ? "translate-x-0" : "-translate-x-60"
                    }`}
                aria-label="sidebar navigation">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 ml-2 w-fit text-2xl font-bold">
                    <span className="sr-only">homepage</span>
                    <Image
                        src="/img/owl-logo-light.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="w-auto h-[35px]"
                        aria-hidden="true"
                    />
                    {/* <span className="text-lg">G3LMS</span> */}

                </Link>

                {/* Search */}
                <div className="relative my-4 flex w-full max-w-xs items-center text-neutral-300">
                    <FiSearch className="absolute left-3 text-lg text-neutral-500" />
                    <input
                        type="search"
                        className="w-full border border-neutral-300 rounded-sm px-10 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-75 border-neutral-700 bg-neutral-950/50 focus-visible:outline-blue-600"
                        name="search"
                        aria-label="Search"
                        placeholder="Search"
                    />
                </div>

                {/* Sidebar links */}
                <div className="flex flex-col gap-3 overflow-y-auto pb-2">
                    <Link
                        href="/dashboard"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiGrid />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/dashboard/users"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard/users"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiUsers />
                        <span>Users</span>
                    </Link>
                    <Link
                        href="/dashboard/books"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard/books"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiBook />
                        <span>Books</span>
                    </Link>
                    <Link
                        href="/dashboard/borrow-return"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard/borrow-return"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiRepeat />
                        <span>Borrow/Return</span>
                    </Link>
                    <Link
                        href="/dashboard/message"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard/messages"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiMessageSquare />
                        <span>Messages</span>
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className={`flex items-center rounded-lg gap-2 px-2 py-2.5 text-sm font-medium ${activePath === "/dashboard/settings"
                            ? "bg-white/5 text-white"
                            : "underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <FiSettings />
                        <span>Settings</span>
                    </Link>
                    <Link
                        href="/book-website"
                        target="_blank" // Opens the website in a new tab
                        className="flex items-center text-blue-500 rounded-lg gap-2 px-2 py-2.5 text-sm font-medium underline-offset-2 focus-visible:underline focus:outline-hidden text-blue-500 hover:bg-white/5 hover:text-blue-500"
                    >
                        <FiGlobe />
                        <span>View Website</span>
                    </Link>
                </div>
            </nav>

            {/* Top navbar & main content */}
            <div className="h-screen w-full overflow-y-auto bg-neutral-950">
                {/* Top navbar */}
                <nav
                    className="sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2 border-neutral-700 bg-neutral-900"
                    aria-label="top navigation bar"
                >
                    {/* Breadcrumbs (hidden on mobile) */}
                    <div className="hidden md:block text-sm font-medium text-neutral-300">
                        {pathSegments.length > 0 ? (
                            pathSegments.map((segment, index) => (
                                <span key={index}>
                                    {index > 0 && <span className="mx-1">›</span>}
                                    <span className="capitalize">
                                        {segment.replace(/-/g, " ")} {/* Replace dashes with spaces */}
                                    </span>
                                </span>
                            ))
                        ) : (
                            <span>Dashboard</span>
                        )}
                    </div>

                    {/* Sidebar toggle button (visible on mobile) */}
                    <button
                        type="button"
                        className="md:hidden text-neutral-300"
                        onClick={() => setSidebarIsOpen(true)}
                    >
                        <FiMenu className="text-lg" />
                        <span className="sr-only">Open sidebar</span>
                    </button>

                    {/* Right-side controls */}
                    <div className="flex items-center gap-4">
                        {/* Theme toggle button */}
                        <button
                            type="button"
                            className="flex items-center gap-2 text-neutral-300 hover:text-white"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            {isDarkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                            <span className="sr-only">Toggle theme</span>
                        </button>
                        {/* Profile Menu */}
                        <div className="relative">
                            <button
                                type="button"
                                className={`flex w-full items-center rounded-sm gap-2 p-2 text-left text-neutral-300 hover:bg-white/5 hover:text-white ${userDropdownIsOpen ? "bg-white/5" : ""
                                    }`}
                                aria-haspopup="true"
                                onClick={() => setUserDropdownIsOpen(!userDropdownIsOpen)}
                                aria-expanded={userDropdownIsOpen}
                            >
                                <Image
                                    src="/img/admin.jpg"
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-cover rounded-full"
                                    aria-hidden="true"
                                />
                                <div className="hidden md:flex flex-col">
                                    <span className="text-sm font-bold dark:text-white">
                                        Admin01
                                    </span>
                                    <span className="text-[8px]" aria-hidden="true">
                                        @admin01
                                    </span>
                                    <span className="sr-only">profile settings</span>
                                </div>
                            </button>

                            {/* Dropdown menu */}
                            {userDropdownIsOpen && (
                                <div
                                    className="absolute top-14 right-0 z-20 h-fit w-48 border divide-y divide-neutral-300 border-neutral-300 bg-white dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 rounded-sm"
                                    role="menu"
                                >
                                    <div className="flex flex-col py-1.5">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                                            role="menuitem"
                                        >
                                            <Image
                                                src="/img/admin.jpg"
                                                alt="Profile"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 rounded-full"
                                                aria-hidden="true"
                                            />
                                            <span>Profile</span>
                                        </Link>
                                    </div>
                                    <div className="flex flex-col py-1.5">
                                        <button
                                            onClick={async () => {
                                                setLoading(true); // Set loading state
                                                await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
                                                setLoading(false);
                                                window.location.href = "http://localhost:3000";
                                            }}
                                            className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium underline-offset-2 focus-visible:underline focus:outline-hidden text-neutral-300 hover:bg-white/5 hover:text-white"
                                            role="menuitem"
                                        >
                                            <FiLogOut />
                                            <span>{loading ? "Logging out..." : "Logout"}</span>
                                        </button>
                                    </div>
                                </div>
                            )} {/*End of Dropdown menu */}
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <div id="main-content" className="p-4">
                    <div className="overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};