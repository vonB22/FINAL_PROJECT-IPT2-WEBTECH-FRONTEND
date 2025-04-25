'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalBooks: 520,
        newBooksThisMonth: 20,
        totalMembers: 42,
        newMembersThisWeek: 5,
        booksIssued: 110,
        overdueReturns: 47,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                const res = await fetch('/api/admin/dashboard-stats');
                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();
                setStats(data);
            } catch (err) {
                setError('Failed to load updated stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className='py-[40px] px-[30px] h-screen pb-[50px]'>
            <div className="text-white text-2xl font-bold mb-6 pl-6">Dashboard</div>

            {/* {error && <div className="text-red-400 pl-6 mb-4">{error}</div>} */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 pr-[90px] bg-black/0 text-white">
                <div className="bg-gray-800 p-10 rounded-lg shadow">
                    <p className="text-sm text-gray-400">Total Books</p>
                    <h2 className="text-2xl font-bold text-white">{stats.totalBooks}</h2>
                    <p className="text-green-400 text-sm mt-1">+{stats.newBooksThisMonth} new this month</p>
                </div>

                <div className="bg-gray-800 p-10 rounded-lg shadow">
                    <p className="text-sm text-gray-400">Total Members</p>
                    <h2 className="text-2xl font-bold text-white">{stats.totalMembers}</h2>
                    <p className="text-green-400 text-sm mt-1">+{stats.newMembersThisWeek} this week</p>
                </div>

                <div className="bg-gray-800 p-10 rounded-lg shadow">
                    <p className="text-sm text-gray-400">Books Issued</p>
                    <h2 className="text-2xl font-bold text-white">{stats.booksIssued}</h2>
                    <p className="text-blue-400 text-sm mt-1">Updated today</p>
                </div>

                <div className="bg-gray-800 p-10 rounded-lg shadow">
                    <p className="text-sm text-gray-400">Overdue Returns</p>
                    <h2 className="text-2xl font-bold text-white">{stats.overdueReturns}</h2>
                    <p className="text-red-400 text-sm mt-1">Action needed</p>
                </div>
            </div>
        </div>
    );
}