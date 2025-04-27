import React from "react";
import Image from "next/image";

const BorrowReturnPage = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 mr-[60px]">
            {/* Page Header */}
            <h1 className="text-2xl font-semibold mb-6">Borrow & Return Books</h1>

            {/* Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Total Borrowed</h3>
                    <p className="text-2xl text-yellow-500">40</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Total Returned</h3>
                    <p className="text-2xl text-green-500">25</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Overdue Books</h3>
                    <p className="text-2xl text-red-500">15</p>
                </div>
            </div>

            {/* Borrowed Books Table */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-zinc-800">
                            <tr>
                                <th className="px-4 py-2 text-left">Book Image</th>
                                <th className="px-4 py-2 text-left">Book Title</th>
                                <th className="px-4 py-2 text-left">Borrower</th>
                                <th className="px-4 py-2 text-left">Borrow Date</th>
                                <th className="px-4 py-2 text-left">Due Date</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-zinc-700">
                                <td className="px-4 py-2">
                                    <Image
                                        src="/img/book02.jpg"
                                        alt="Book"
                                        height={70}
                                        width={48}
                                        className="w-12 h-[70px] object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">Lost Decades</td>
                                <td className="px-4 py-2">John Doe</td>
                                <td className="px-4 py-2">2025-04-20</td>
                                <td className="px-4 py-2">2025-05-01</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg">
                                        Mark as Returned
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Returned Books Table */}
            <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Returned Books</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-zinc-800">
                            <tr>
                                <th className="px-4 py-2 text-left">Book Image</th>
                                <th className="px-4 py-2 text-left">Book Title</th>
                                <th className="px-4 py-2 text-left">Borrower</th>
                                <th className="px-4 py-2 text-left">Borrow Date</th>
                                <th className="px-4 py-2 text-left">Return Date</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-zinc-700">
                                <td className="px-4 py-2">
                                    <Image
                                        src="/img/book01.jpg"
                                        alt="Book"
                                        height={70}
                                        width={48}
                                        className="w-12 h-[70px] object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">The Pain Of Onkai</td>
                                <td className="px-4 py-2">John Doe</td>
                                <td className="px-4 py-2">2025-04-20</td>
                                <td className="px-4 py-2">2025-04-25</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-t border-zinc-700">
                                <td className="px-4 py-2">
                                    <Image
                                        src="/img/book01.jpg"
                                        alt="Book"
                                        height={70}
                                        width={48}
                                        className="w-12 h-[70px] object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">The Pain Of Onkai</td>
                                <td className="px-4 py-2">Jane Smith</td>
                                <td className="px-4 py-2">2025-04-18</td>
                                <td className="px-4 py-2">2025-04-22</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BorrowReturnPage;