'use client';
import Image from 'next/image';
import { FiEye, FiEdit, FiTrash, FiSearch, FiPlus } from 'react-icons/fi';
import { useState, useMemo, useEffect } from 'react';
import apiClient from '@/lib/axios';
import AddModal from '@/components/modals/BooksModal/AddModal';
import ViewModal from '@/components/modals/BooksModal/ViewModal';
import EditModal from '@/components/modals/BooksModal/EditModal';
import DeleteModal from '@/components/modals/BooksModal/DeleteModal';

export default function BooksPage1() {
    // Sample books
    const sampleBooks = [
        {
            id: 1,
            title: 'The Pain of Onkai',
            author: 'N.K. Edo',
            category: 'Fiction',
            published: '2022',
            status: 'Available',
            image: '/img/book01.png',
        },
        {
            id: 2,
            title: 'Lost Decades',
            author: 'Menzie Chinn',
            category: 'Non-Fiction',
            published: '2024',
            status: 'Issued',
            image: '/img/book02.png',
        },
        {
            id: 3,
            title: 'Eloquent JavaScript',
            author: 'Marijn Haverbeke',
            category: 'Programming',
            published: '2024',
            status: 'Available',
            image: '/img/book03.png',
        },
    ];

    const [allBooks, setAllBooks] = useState(sampleBooks);
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [publishedFilter, setPublishedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Fetch books from backend (READ)
    const fetchBooks = async () => {
        try {
            const response = await apiClient.get('/books');
            // If using Laravel Resource, data is in response.data.data
            const books = Array.isArray(response.data.data) ? response.data.data : [];
            // Merge backend books with sampleBooks, avoiding duplicates by id
            const merged = [
                ...books.filter(b => !sampleBooks.some(sb => sb.id === b.id)),
                ...sampleBooks,
            ];
            setAllBooks(merged);
        } catch (error) {
            setAllBooks(sampleBooks);
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Add Book (CREATE)
    const handleAddBook = async (bookData) => {
        try {
            // bookData: { title, author, category, published, status }
            await apiClient.post('/books', bookData);
            setAddModalOpen(false);
            fetchBooks(); // Refresh the list after adding
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setEditModalOpen(true);
    };

    const handleViewBook = (book) => {
        setSelectedBook(book);
        setViewModalOpen(true);
    };

    const handleSaveBook = async (bookData) => {
        try {
            if (selectedBook) {
                await apiClient.put(`/books/${selectedBook.id}`, bookData);
                setEditModalOpen(false);
            }
            setSelectedBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const DeleteModalOpen = (book) => {
        setSelectedBook(book);
        setDeleteModalOpen(true);
    };

    // Delete Book
    const handleDeleteBook = async (bookId) => {
        try {
            await apiClient.delete(`/books/${bookId}`);
            setDeleteModalOpen(false);
            setSelectedBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Filter books based on filters and search query
    const filteredBooks = useMemo(() => {
        return allBooks.filter((book) => {
            const matchesStatus =
                statusFilter === 'All' || book.status === statusFilter;
            const matchesCategory =
                categoryFilter === 'All' || book.category === categoryFilter;

            // Handle Published Year Range
            const matchesPublished = publishedFilter === 'All' || (() => {
                const [start, end] = publishedFilter.split('-').map(Number);
                const publishedYear = parseInt(book.published, 10);
                return publishedYear >= start && publishedYear <= end;
            })();

            const matchesSearchQuery =
                searchQuery === '' ||
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesCategory && matchesPublished && matchesSearchQuery;
        });
    }, [allBooks, statusFilter, categoryFilter, publishedFilter, searchQuery]);

    // Paginated books
    const paginatedBooks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBooks.slice(startIndex, endIndex);
    }, [filteredBooks, currentPage]);

    // Total pages
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const handleSearchToggle = () => {
        setSearchOpen((prev) => !prev);
        setSearchQuery(''); // Clear search query when toggling
    };

    // Book image fallback
    const getBookImage = (book) => {
        return book.image || '/img/book01.png';
    };

    return (
        <main className="h-[80vh] bg-neutral-950 text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg sm:text-2xl font-bold">Books Table</h1>
                </div>

                {/* Filters and Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="grid grid-cols-3 gap-4 w-full sm:w-[400px]">
                        {[
                            {
                                label: "Filter by Status",
                                value: statusFilter,
                                onChange: (e) => setStatusFilter(e.target.value),
                                options: ["All", "Available", "Issued"],
                            },
                            {
                                label: "Filter by Category",
                                value: categoryFilter,
                                onChange: (e) => setCategoryFilter(e.target.value),
                                options: [
                                    "All", "Fiction", "Non-Fiction", "Programming", "Classic", "Dystopian", "Adventure", "Romance",
                                ],
                            },
                            {
                                label: "Filter by Published Year",
                                value: publishedFilter,
                                onChange: (e) => setPublishedFilter(e.target.value),
                                options: [
                                    "All", "2020-2025", "2010-2019", "2001-2009", "1950-2000", "1800-1949",
                                ],
                            },
                        ].map(({ label, value, onChange, options }, index) => (
                            <div key={index} className="w-full max-w-[180px]">
                                <label className="block text-[11px] sm:text-xs font-medium text-gray-400 mb-1 whitespace-nowrap">
                                    {label}
                                </label>
                                <select
                                    value={value}
                                    onChange={onChange}
                                    className="w-full text-[10px] sm:text-sm px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    {options.map((opt, idx) => (
                                        <option key={idx} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
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
                                    placeholder="Search books..."
                                    className={`w-full px-[10px] py-[9px] text-xs bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600 
                                        transition-all duration-300 ease-in-out ${searchOpen ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
                                        }`}
                                />
                            )}
                        </div>

                        {/* Add Book Button */}
                        <button onClick={() => setAddModalOpen(true)}
                            className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm rounded whitespace-nowrap">
                            <FiPlus />
                            Add Book
                        </button>
                    </div>
                </div>

                {/* Books Table */}
                <div className="overflow-x-auto bg-neutral-900 rounded-lg shadow whitespace-nowrap">
                    <table className="w-full text-[10px] sm:text-sm text-left text-white">
                        <thead className="text-[10px] sm:text-xs uppercase bg-neutral-800 text-gray-400">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Book</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Published</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {paginatedBooks.map((book) => (
                                <tr key={book.id} className="hover:bg-neutral-800/30">
                                    {/* ID */}
                                    <td className="px-4 py-3">{book.id}</td>

                                    {/* Book Image */}
                                    <td className="px-4 py-3">
                                        <Image
                                            src={book.image || '/img/book01.png'}
                                            alt={book.title}
                                            width={32}
                                            height={48}
                                            className="rounded object-cover"
                                        />
                                    </td>

                                    {/* Title */}
                                    <td className="px-4 py-3">{book.title}</td>

                                    {/* Author */}
                                    <td className="px-4 py-3">{book.author}</td>

                                    {/* Category */}
                                    <td className="px-4 py-3">{book.category}</td>

                                    {/* Published */}
                                    <td className="px-4 py-3">{book.published}</td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${book.status === 'Available'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-red-600 text-white'
                                                }`}
                                        >
                                            {book.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewBook(book)}
                                                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                                                title="View"
                                            >
                                                <FiEye />
                                            </button>
                                            <button
                                                onClick={() => handleEditBook(book)}
                                                className="p-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded"
                                                title="Edit"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => DeleteModalOpen(book)}
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
                        {Math.min(currentPage * itemsPerPage, filteredBooks.length)} of{' '}
                        {filteredBooks.length} books
                    </div>
                </div>
            </div>
            <AddModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleAddBook}
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
                onDelete={() => handleDeleteBook(selectedBook.id)}
                book={selectedBook}
            />
        </main >
    );
}

// No code change needed here for CSRF 419 error. Fix backend route/middleware.

// IMPORTANT: If you see "CSRF token mismatch." when POSTing/PUTting to /books,
// this is a backend (Laravel) configuration issue, not a frontend bug.
// To fix:
// 1. Make sure your /books API routes are in routes/api.php, NOT routes/web.php.
// 2. In app/Http/Kernel.php, the 'api' middleware group should NOT include \App\Http\Middleware\VerifyCsrfToken::class.
// 3. Do not use session/cookie auth for API routes; use token auth if needed.
// 4. No frontend code change will fix this; it must be fixed in your Laravel backend config.