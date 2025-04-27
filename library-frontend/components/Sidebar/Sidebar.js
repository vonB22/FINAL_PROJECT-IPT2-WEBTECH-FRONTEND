'use client';
import { useEffect } from 'react';
import './sidebar.css';
import Link from "next/link";
import Image from 'next/image';

export default function AdminLayout({ children }) {
    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        const closeBtn = document.querySelector('#btn');
        const searchBtn = document.querySelector('.bx-search');
        const homeSection = document.querySelector('.home-section');

        const menuBtnChange = () => {
            if (sidebar.classList.contains('open')) {
                closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
            } else {
                closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
            }
        };

        const updateHomeSectionMargin = () => {
            if (homeSection) {
                if (sidebar.classList.contains('open')) {
                    homeSection.style.marginLeft = '150px';
                } else {
                    homeSection.style.marginLeft = '0';
                }
            }
        };

        closeBtn?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            menuBtnChange();
            updateHomeSectionMargin();
        });

        searchBtn?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            menuBtnChange();
            updateHomeSectionMargin();
        });
    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="sidebar bg-zinc-900">
                <div className="logo-details">
                    
                    <span className="logo-icon">
                        <Image src="/img/admin.jpg" alt="Profile" width={32} height={32} className="mx-auto rounded-full mb-0 mr-3 ml-2" />
                    </span>
                    {/* <span className="logo-icon"><i className="bx bx-user-circle"></i></span> */}
                    <div className="logo_name">Admin</div>
                    <i className="bx bx-menu" id="btn"></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <i className="bx bx-search bg-zinc-800 hover:bg-blue-500"></i>
                        <input type="text" className="bg-zinc-800" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </li>
                    <li>
                        <Link href="/admin" id="dash">
                            <i className="bx bx-grid-alt"></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                        <span className="tooltip">Dashboard</span>
                    </li>
                    <li>
                        <Link href="/admin/users">
                            <i className="bx bx-user"></i>
                            <span className="links_name">Users</span>
                        </Link>
                        <span className="tooltip">Users</span>
                    </li>
                    <li>
                        <Link href="/admin/books">
                            <i className="bx bx-book"></i>
                            <span className="links_name">Books</span>
                        </Link>
                        <span className="tooltip">Books</span>
                    </li>
                    <li>
                        <Link href="/admin/borrow-return">
                            <i className="fa-solid fa-arrows-rotate"></i>
                            <span className="links_name">Borrow/Return</span>
                        </Link>
                        <span className="tooltip">Borrow/Return</span>
                    </li>
                    <li>
                        <Link href="/admin/message">
                            <i className="bx bx-chat"></i>
                            <span className="links_name">Messages</span>
                        </Link>
                        <span className="tooltip">Messages</span>
                    </li>
                    <li>
                        <Link href="/admin/chart">
                            <i className="bx bx-pie-chart-alt-2"></i>
                            <span className="links_name">Analytics/Reports</span>
                        </Link>
                        <span className="tooltip">Analytics/Reports</span>
                    </li>
                    <li>
                        <Link href="/admin/settings">
                            <i className="bx bx-cog"></i>
                            <span className="links_name">Setting</span>
                        </Link>
                        <span className="tooltip">Setting</span>
                    </li>
                    <li className="profile bg-zinc-800">
                        <Link href="/">
                            Logout <i className="bx bx-log-out" id="log_out"></i>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Page Content */}
            <section className="home-section flex-1 overflow-y-auto">
                {children}
            </section>
        </div>
    );
}