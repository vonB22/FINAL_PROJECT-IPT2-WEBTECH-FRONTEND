'use client';

import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalBooks: 520,
        newBooksThisMonth: 20,
        totalMembers: 42,
        newMembersThisWeek: 5,
        booksIssued: 110,
        overdueReturns: 43,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchStats() {
    //         setLoading(true);
    //         try {
    //             const res = await fetch('/api/admin/dashboard-stats');
    //             if (!res.ok) throw new Error('Failed to fetch');

    //             const data = await res.json();
    //             setStats(data);
    //         } catch (err) {
    //             // setError('Failed to load updated stats');
    //             setError('');
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchStats();
    // }, []);

    // Data for Bar Chart
    const barChartData = {
        labels: ['Books', 'Members', 'Issued', 'Overdue'],
        datasets: [
            {
                label: 'Statistics',
                data: [
                    stats.totalBooks,
                    stats.totalMembers,
                    stats.booksIssued,
                    stats.overdueReturns,
                ],
                backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
                borderWidth: 1,
            },
        ],
    };

    // Data for Line Chart
    const lineChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Books Issued',
                data: [20, 50, 70, stats.booksIssued],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Overdue Returns',
                data: [5, 20, 30, stats.overdueReturns],
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="py-1 px-6 bg-neutral-950 h-[80vh]">
            <div className="text-white text-2xl font-bold mb-6">Dashboard</div>

            {error && <div className="text-red-400 mb-4">{error}</div>}

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
                <StatCard
                    title="Total Books"
                    value={stats.totalBooks}
                    subtitle={`+${stats.newBooksThisMonth} new this month`}
                    subtitleColor="text-green-400"
                />
                <StatCard
                    title="Total Members"
                    value={stats.totalMembers}
                    subtitle={`+${stats.newMembersThisWeek} this week`}
                    subtitleColor="text-green-400"
                />
                <StatCard
                    title="Books Issued"
                    value={stats.booksIssued}
                    subtitle="Updated today"
                    subtitleColor="text-blue-400"
                />
                <StatCard
                    title="Overdue Returns"
                    value={stats.overdueReturns}
                    subtitle="Action needed"
                    subtitleColor="text-red-400"
                />
            </div>

            {/* Charts Section */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Bar Chart">
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </ChartCard>
                <ChartCard title="Line Chart">
                    <Line
                        data={lineChartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </ChartCard>
            </div>
        </div>
    );
}

// Reusable Stat Card Component
function StatCard({ title, value, subtitle, subtitleColor }) {
    return (
        <div className="bg-neutral-900 p-6 rounded-lg shadow">
            <p className="text-sm text-gray-300">{title}</p>
            <h2 className="text-2xl font-bold text-white">{value}</h2>
            <p className={`text-sm mt-1 ${subtitleColor}`}>{subtitle}</p>
        </div>
    );
}

// Reusable Chart Card Component
function ChartCard({ title, children }) {
    return (
        <div className="bg-neutral-900 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
            <div className="h-[200px]">{children}</div> {/* Reduced height */}
        </div>
    );
}