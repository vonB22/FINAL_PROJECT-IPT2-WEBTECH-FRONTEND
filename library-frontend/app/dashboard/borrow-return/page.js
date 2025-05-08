'use client';
import Image from 'next/image';
import { FiEye, FiEdit, FiTrash, FiSearch, FiPlus } from 'react-icons/fi';
import { useState, useMemo } from 'react';

export default function BorrowReturnPage() {
    const allTransactions = useMemo(() => [
        {
            id: 1,
            book: 'The Pain of Onkai',
            borrower: 'Car Doe',
            borrowDate: '2025-05-01',
            returnDate: '2025-05-15',
            status: 'Returned',
            image: '/img/book01.png',
        },
        {
            id: 2,
            book: 'Lost Decades',
            borrower: 'Jane Smith',
            borrowDate: '2025-04-20',
            returnDate: '2025-05-05',
            status: 'Overdue',
            image: '/img/book02.png',
        },
        {
            id: 3,
            book: 'Eloquent JavaScript',
            borrower: 'Alice Johnson',
            borrowDate: '2025-05-10',
            returnDate: '2025-05-25',
            status: 'Borrowed',
            image: '/img/book03.png',
        },
    ], []);


    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Filter transactions based on filters and search query
    const filteredTransactions = useMemo(() => {
        return allTransactions.filter((transaction) => {
            const matchesStatus =
                statusFilter === 'All' || transaction.status === statusFilter;

            const matchesSearchQuery =
                searchQuery === '' ||
                transaction.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.borrower.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearchQuery;
        });
    }, [allTransactions, statusFilter, searchQuery]);

    // Paginated transactions
    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredTransactions.slice(startIndex, endIndex);
    }, [filteredTransactions, currentPage]);

    // Total pages
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handleSearchToggle = () => {
        setSearchOpen((prev) => !prev);
        setSearchQuery(''); // Clear search query when toggling
    };

    return (
        <main className="h-[80vh] bg-neutral-950 text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg sm:text-2xl font-bold">Borrow/Return Table</h1>
                </div>

                {/* Filters and Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-[11px] sm:text-xs font-medium text-gray-400 mb-1">
                                Filter by Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full text-xs sm:text-sm px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="All">All</option>
                                <option value="Borrowed">Borrowed</option>
                                <option value="Returned">Returned</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                        </div>
                    </div>

                    {/* Add Button and Search */}
                    <div className="flex items-center gap-3 w-full sm:w-auto sm:mb-[-12px]">
                        <div className="relative flex items-center">
                            <button
                                onClick={handleSearchToggle}
                                className="p-[10px] bg-neutral-800 hover:bg-neutral-700 text-gray-400 rounded"
                            >
                                <FiSearch />
                            </button>
                            {searchOpen && (
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search transactions..."
                                    className={`w-full px-[10px] py-[9px] text-xs bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600 
                                        transition-all duration-300 ease-in-out ${searchOpen ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
                                        }`}
                                />
                            )}
                        </div>

                        {/* Add Transaction Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm rounded whitespace-nowrap">
                            <FiPlus />
                            Add Transaction
                        </button>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto bg-neutral-900 rounded-lg shadow">
                    <table className="w-full text-[10px] sm:text-sm text-left text-white">
                        <thead className="text-[10px] sm:text-xs uppercase bg-neutral-800 text-gray-400 whitespace-nowrap">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Book</th>
                                <th className="px-4 py-3">Borrower</th>
                                <th className="px-4 py-3">Borrow Date</th>
                                <th className="px-4 py-3">Return Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {paginatedTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-neutral-800/30">
                                    {/* ID */}
                                    <td className="px-4 py-3">{transaction.id}</td>

                                    {/* Book Image */}
                                    <td className="px-4 py-3">
                                        <Image
                                            src={transaction.image}
                                            alt={transaction.book}
                                            width={32}
                                            height={48}
                                            className="rounded object-cover"
                                        />
                                    </td>

                                    {/* Borrower */}
                                    <td className="px-4 py-3">{transaction.borrower}</td>

                                    {/* Borrow Date */}
                                    <td className="px-4 py-3">{transaction.borrowDate}</td>

                                    {/* Return Date */}
                                    <td className="px-4 py-3">{transaction.returnDate}</td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-[11px] sm:text-xs font-medium rounded ${transaction.status === 'Returned'
                                                ? 'bg-green-600 text-white'
                                                : transaction.status === 'Overdue'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-yellow-600 text-white'
                                                }`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                                                title="View"
                                            >
                                                <FiEye />
                                            </button>
                                            <button
                                                className="p-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded"
                                                title="Edit"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded"
                                                title="Delete"
                                            >
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 text-sm">
                    <div className="flex gap-2 text-xs">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-neutral-800 text-gray-400 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-neutral-800 text-gray-400'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-neutral-800 text-gray-400 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    <div className="text-center w-full sm:w-auto text-xs sm:text-sm text-gray-400">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
                        {filteredTransactions.length} transactions
                    </div>
                </div>
            </div>
        </main>
    );
}