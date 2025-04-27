'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import ViewModal from '@/components/modals/BooksModal/ViewModal';
import DeleteModal from '@/components/modals/BooksModal/DeleteModal';
import EditModal from '@/components/modals/BooksModal/EditModal';
import AddModal from '@/components/modals/BooksModal/AddModal';

const BooksTable = () => {
    const initialBooks = [
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

    const [allBooks, setAllBooks] = useState(initialBooks);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentBooks = allBooks.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(allBooks.length / rowsPerPage);
    const [darkMode, setDarkMode] = useState(true);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);


    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleAddBook = () => {
        setAddModalOpen(true);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setEditModalOpen(true);
    };

    const handleViewBook = (book) => {
        setSelectedBook(book);
        setViewModalOpen(true);
    };

    const handleDeleteBook = (bookId) => {
        setAllBooks((prevBooks) => {
            const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
            const newTotalPages = Math.ceil(updatedBooks.length / rowsPerPage);
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
            }
            return updatedBooks;
        });
        setDeleteModalOpen(false);
    };

    const openDeleteModal = (book) => {
        setSelectedBook(book);
        setDeleteModalOpen(true);
    };

    const handleSaveBook = (newBook) => {
        if (selectedBook) {
            // Edit existing book
            setAllBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === selectedBook.id ? { ...book, ...newBook } : book
                )
            );
        } else {
            // Add new book
            setAllBooks((prevBooks) => [
                ...prevBooks,
                { id: Date.now(), ...newBook }, // Use a unique ID
            ]);
        }
    };

    return (
        <div className={`py-8 px-6 sm:px-6 lg:px-8 h-screen pb-8 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} lg:mr-[14px] overflow-auto`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold">BOOKS</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <button onClick={toggleDarkMode} className="text-2xl">
                        {darkMode ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
                    </button>
                    <div className="flex md:flex items-center w-full m-0 sm:mx-2 relative">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className={`w-full px-3 py-2 pr-10 rounded ${darkMode ? 'bg-zinc-900 border-gray-500 text-white' : 'bg-gray-200 border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        />
                        <button className="absolute right-3 text-gray-400 hover:text-blue-500">
                            <FaSearch className="h-5 w-5" />
                        </button>
                    </div>
                    <button
                        onClick={handleAddBook}
                        className="flex items-center gap-2 px-4 py-2 w-full max-w-xs text-sm mr-[65px] lg:w-[200px] bg-blue-600 hover:bg-blue-500 text-white rounded"
                    >
                        <FaPlus /> Add Book
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto pr-16">
                <table className={`min-w-full ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'} rounded-lg`}>
                    <thead>
                        <tr className={`${darkMode ? 'bg-zinc-800' : 'bg-gray-300'} text-left`}>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">ID</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Book</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Title</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Author</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Category</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Published</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base">Status</th>
                            <th className="px-4 py-2 text-xs sm:text-sm md:text-base text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book) => (
                            <tr
                                key={book.id}
                                className={`border-b ${darkMode ? 'border-zinc-700 hover:bg-zinc-800/50' : 'border-gray-300 hover:bg-gray-200'} transition-colors`}
                            >
                                <td className="px-6 py-4 text-xs md:text-sm">{book.id}</td>
                                <td className="px-6 py-4">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        height={48}
                                        width={36}
                                        className="h-12 w-9 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-xs md:text-sm truncate">{book.title}</td>
                                <td className="px-6 py-4 text-xs md:text-sm truncate">{book.author}</td>
                                <td className="px-6 py-4 text-xs md:text-sm truncate">{book.category}</td>
                                <td className="px-6 py-4 text-xs md:text-sm">{book.published}</td>
                                <td className="px-6 py-4 text-xs md:text-sm">
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
                                        <button onClick={() => handleViewBook(book)} className="text-blue-500">
                                            <FaEye size={16} />
                                        </button>
                                        <button onClick={() => handleEditBook(book)} className="text-yellow-500">
                                            <FaEdit size={16} />
                                        </button>
                                        <button onClick={() => openDeleteModal(book)} className="text-red-500 hover:text-red-400">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1 text-sm">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${darkMode ? 'bg-zinc-800 text-white' : 'bg-gray-300 text-black'} disabled:opacity-50`}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-black'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${darkMode ? 'bg-zinc-700 text-white' : 'bg-gray-300 text-black'} disabled:opacity-50`}
                        >
                            Next
                        </button>
                    </div>

                    <div className={`text-center w-full sm:w-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Showing {indexOfFirstRow + 1}–{Math.min(indexOfLastRow, allBooks.length)} of {allBooks.length} books
                    </div>
                </div>
            </div>
            <AddModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleSaveBook}
            />

            <ViewModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                book={selectedBook}
            />

            <EditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveBook}
                book={selectedBook}
            />

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteBook}
                book={selectedBook}
            />
        </div>
    );
};

export default BooksTable;