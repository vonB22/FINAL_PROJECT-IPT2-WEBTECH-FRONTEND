'use client';

import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaPlus, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import AddUserModal from '@/components/modals/usersModal/AddUserModal';
import ViewUserModal from '@/components/modals/usersModal/ViewUserModal';
import EditUserModal from '@/components/modals/usersModal/EditUserModal';
import DeleteUserModal from '@/components/modals/usersModal/DeleteUserModal';

const LibraryUsersTable = () => {
    const allUsers = [
        { id: 1, name: 'Johnson', email: 'johnson@example.com', role: 'Student', joined: '2024-09-15', status: 'Active' },
        { id: 2, name: 'Tigreal', email: 'tigreal@example.com', role: 'Student', joined: '2023-12-01', status: 'Active' },
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

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [darkMode, setDarkMode] = useState(true);

    const openAddModal = () => setAddModalOpen(true);
    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };
    const openViewModal = (user) => {
        setSelectedUser(user);
        setViewModalOpen(true);
    };
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const closeAddModal = () => setAddModalOpen(false);
    const closeEditModal = () => setEditModalOpen(false);
    const closeViewModal = () => setViewModalOpen(false);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSaveUser = (user) => {
        if (selectedUser) {
            // Edit existing user
            setAllUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === selectedUser.id ? { ...u, ...user } : u))
            );
        } else {
            // Add new user
            setAllUsers((prevUsers) => [
                ...prevUsers,
                { id: Date.now(), ...user }, // Use a unique ID
            ]);
        }
    };

    const handleDeleteUser = (userId) => {
        setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    return (
        <div className={`py-[40px] px-[30px] h-screen pb-[50px] mr-[17px] ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">USERS</h2>
                <div className="flex items-center gap-4">
                    <button onClick={toggleDarkMode} className="text-2xl">
                        {darkMode ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
                    </button>
                    <div className="hidden md:flex items-center w-full max-w-md mx-2 relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className={`w-full px-3 py-2 pr-10 rounded text-sm ${darkMode ? 'bg-gray-700 border-gray-500 text-white' : 'bg-gray-200 border-gray-300 text-black'} focus:outline-none focus:ring-2 focus:ring-blue-600`}
                        />
                        <button className="absolute right-3 text-gray-400 hover:text-blue-500">
                            <FaSearch className="h-5 w-5" />
                        </button>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-[8px] w-[200px] text-sm mr-[63px] bg-blue-600 hover:bg-blue-500 text-white rounded">
                        <FaPlus /> Add User
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto pr-[60px]">
                <table className={`min-w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} rounded-lg`}>
                    <thead>
                        <tr className={`${darkMode ? 'bg-gray-600' : 'bg-gray-300'} text-left`}>
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
                            <tr key={user.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/35' : 'border-gray-300 hover:bg-gray-200'} transition-colors`}>
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
                                        <button
                                            onClick={() => openViewModal(user)}
                                            title="View"
                                            className="text-blue-500 hover:text-blue-400"
                                        >
                                            <FaEye size={16} />
                                        </button>
                                        <button
                                            onClick={() => openEditModal(user)}
                                            title="Edit"
                                            className="text-yellow-500 hover:text-yellow-400"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(user)}
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

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 text-sm">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} disabled:opacity-50`}
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
                            className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} disabled:opacity-50`}
                        >
                            Next
                        </button>
                    </div>

                    <div className={`text-center w-full sm:w-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, allUsers.length)} of {allUsers.length} users
                    </div>
                </div>
            </div>

            <AddUserModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleSaveUser}
            />

            <EditUserModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />

            <ViewUserModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                user={selectedUser}
            />

            <DeleteUserModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteUser}
                user={selectedUser}
            />
        </div>
    );
};

export default LibraryUsersTable;