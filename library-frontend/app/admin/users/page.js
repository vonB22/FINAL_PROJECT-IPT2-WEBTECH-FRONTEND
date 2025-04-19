'use client';

import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import AllUserModals from '@/components/modals/usersModal/allModal';

const LibraryUsersTable = () => {
    const allUsers = [
        { id: 1, name: 'Johnson', email: 'johnson@example.com', role: 'Student', joined: '2024-09-15', status: 'Active' },
        { id: 2, name: 'Tigreal', email: 'tigreal@example.com', role: 'Faculty', joined: '2023-12-01', status: 'Active' },
        { id: 3, name: 'Lukas', email: 'lukas@example.com', role: 'Student', joined: '2025-01-10', status: 'Inactive' },
        { id: 4, name: 'Kalea', email: 'kalea@example.com', role: 'Librarian', joined: '2022-07-22', status: 'Active' },
        { id: 5, name: 'Lukas', email: 'lukas@example.com', role: 'Student', joined: '2025-01-10', status: 'Inactive' },
        { id: 6, name: 'Lukas', email: 'lukas@example.com', role: 'Student', joined: '2025-01-10', status: 'Active' },
        { id: 7, name: 'Lukas', email: 'lukas@example.com', role: 'Student', joined: '2025-01-10', status: 'Inactive' },
        { id: 8, name: 'Lukas', email: 'lukas@example.com', role: 'Student', joined: '2025-01-10', status: 'Active' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentUsers = allUsers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(allUsers.length / rowsPerPage);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (type, user = null) => {
        setModalType(type);
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
        setModalType('');
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="p-3 min-h-screen text-black mr-[20px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Users</h2>
                <div className="hidden md:flex items-center w-full max-w-md mx-2 relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-3 py-2 pr-10 rounded bg-gray-700/0 border border-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        className="absolute right-3 text-gray-400 hover:text-blue-500"
                    >
                        <FaSearch className="h-5 w-5" />
                    </button>
                </div>
                <button
                    onClick={() => openModal('add')}
                    className="flex items-center gap-2 px-4 mr-[60px] py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                >
                    <FaPlus /> Add User
                </button>
            </div>

            <div className="overflow-x-auto pr-[60px]">
                <table className="min-w-full bg-gray-800 text-white rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-600">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Joined</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/35 transition-colors">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">{user.joined}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span>{user.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4">
                                        {/* View */}
                                        <button
                                            onClick={() => openModal('view', user)}
                                            title="View"
                                            className="text-gray-400 hover:text-blue-400"
                                        >
                                            <FaEye size={16} />
                                        </button>
                                        {/* Edit */}
                                        <button
                                            onClick={() => openModal('edit', user)}
                                            title="Edit"
                                            className="text-gray-400 hover:text-yellow-400"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        {/* Delete */}
                                        <button
                                            onClick={() => openModal('delete', user)}
                                            title="Delete"
                                            className="text-red-500 hover:text-red-400"
                                        >
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
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200'}`}
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
                        Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, allUsers.length)} of {allUsers.length} users
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit/View/Delete */}
            <AllUserModals
                isOpen={modalOpen}
                onClose={closeModal}
                type={modalType}
                user={selectedUser}
            />
        </div>
    );
};

export default LibraryUsersTable;