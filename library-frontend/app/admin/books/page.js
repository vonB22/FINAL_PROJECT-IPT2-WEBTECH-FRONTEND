'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus, FaSearch } from 'react-icons/fa';

const BooksTable = () => {
    const allBooks = [
        {
            id: 1,
            title: 'The Pain of Onkai',
            author: 'N.K. Edo',
            category: 'Fiction, Fantasy',
            published: '2022',
            status: 'Available',
            image: '/img/book01.jpg',
        },
        {
            id: 2,
            title: 'Lost Decades',
            author: 'Menzie Chinn',
            category: 'Non-Fiction',
            published: '2024',
            status: 'Issued',
            image: '/img/book02.jpg',
        },
        {
            id: 3,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 4,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 5,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Reserved',
            image: '/img/book03.jpg',
        },
        {
            id: 6,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 7,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 8,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 9,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 10,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 11,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 12,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 13,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
        {
            id: 14,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.jpg',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentBooks = allBooks.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(allBooks.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-3 bg-gray-900/0 min-h-screen text-white mr-[20px]">
            <div className="flex items-center justify-between mb-4 pr-16">
                <h2 className="text-2xl font-bold">Books</h2>

                <div className="hidden md:flex items-center w-full max-w-md mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="w-full px-4 py-2 pr-10 rounded bg-gray-700/0 border border-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <button
                        className="absolute right-3 text-gray-400 hover:text-blue-500"
                    >
                        <FaSearch className="h-5 w-5" />
                    </button>
                </div>

                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    <FaPlus />
                    Add Book
                </button>
            </div>

            <div className="overflow-x-auto pr-16">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Book</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Author</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Published</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book) => (
                            <tr
                                key={book.id}
                                className="border-b border-gray-700 hover:bg-gray-700/35 transition-colors"
                            >
                                <td className="px-6 py-4">{book.id}</td>
                                <td className="px-6 py-4">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        height={48}
                                        width={36}
                                        className="h-12 w-9 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4">{book.title}</td>
                                <td className="px-6 py-4">{book.author}</td>
                                <td className="px-6 py-4">{book.category}</td>
                                <td className="px-6 py-4">{book.published}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`h-2.5 w-2.5 rounded-full ${book.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        ></span>
                                        <span>{book.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4 text-white">
                                        <button className="hover:text-yellow-400">
                                            <FaEdit size={16} />
                                        </button>
                                        <button className="hover:text-blue-400">
                                            <FaEye size={16} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-400">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 text-sm text-gray-700">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-600 text-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    <div className="text-gray-600 text-center w-full sm:w-auto">
                        Showing {indexOfFirstRow + 1}–{Math.min(indexOfLastRow, allBooks.length)} of {allBooks.length} books
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksTable;