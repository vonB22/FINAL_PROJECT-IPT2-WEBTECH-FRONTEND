'use client';
import Image from 'next/image';
import { FiEye, FiEdit, FiTrash, FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useMemo } from 'react';
import DeleteUserModal from '@/components/modals/usersModal/DeleteUserModal';

export default function Page() {
    const allUsers = [
        {
            id: 1,
            name: 'Miya',
            email: 'miya@example.com',
            avatar: '/img/F.jpg',
            joinedDate: '2/10/2023',
            status: 'Inactive',
        },
        {
            id: 2,
            name: 'Zoro',
            email: 'zoro@example.com',
            avatar: '/img/M.jpg',
            joinedDate: '11/10/2023',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Karina',
            email: 'karina@example.com',
            avatar: '/img/F.jpg',
            joinedDate: '12/10/2023',
            status: 'Inactive',
        },
        {
            id: 4,
            name: 'Igris',
            email: 'igris@example.com',
            avatar: '/img/M.jpg',
            joinedDate: '1/1/2024',
            status: 'Active',
        },
        {
            id: 5,
            name: 'Car Doe',
            email: 'car.doe@example.com',
            avatar: '/img/M.jpg',
            joinedDate: '3/10/2024',
            status: 'Active',
        },
        {
            id: 6,
            name: 'Layla',
            email: 'layla@example.com',
            avatar: '/img/F.jpg',
            joinedDate: '6/10/2025',
            status: 'Active',
        },
        {
            id: 7,
            name: 'Kaisel',
            email: 'kaisel@example.com',
            avatar: '/img/M.jpg',
            joinedDate: '9/1/2025',
            status: 'Active',
        },
    ]

    // const [allUsers, setAllUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [joinedDateFilter, setJoinedDateFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch(
    //                 `/api/users?status=${statusFilter}&joinedDate=${joinedDateFilter}&search=${searchQuery}&page=${currentPage}&limit=${itemsPerPage}`
    //             );
    //             const data = await response.json();
    //             setAllUsers(data);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };

    //     fetchUsers();
    // }, [statusFilter, joinedDateFilter, searchQuery, currentPage]);

    const handleSearchToggle = () => {
        setSearchOpen((prev) => !prev);
        setSearchQuery(''); // Clear search query when toggling
    };

    const [searchOpen, setSearchOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = () => {
        if (selectedUser) {
            setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
            closeDeleteModal();
        }
    };

    // Dynamically compute filtered users
    const filteredUsers = useMemo(() => {
        return allUsers.filter((user) => {
            const matchesStatus =
                statusFilter === 'All' || user.status === statusFilter;
            const matchesJoinedDate =
                joinedDateFilter === 'All' || user.joinedDate.includes(joinedDateFilter);
            const matchesSearchQuery =
                searchQuery === '' ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesJoinedDate && matchesSearchQuery; // Include matchesSearchQuery
        });
    }, [allUsers, statusFilter, joinedDateFilter, searchQuery]);

    // Paginated users
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage]);

    // Total pages
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <main className="h-[80vh] bg-neutral-950 text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg sm:text-2xl font-bold">Users Table</h1>
                </div>

                {/* Filters and Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-[10px] sm:text-xs font-medium text-gray-400 mb-1">
                                Filter by Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full text-[10px] sm:text-xs px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Joined Date Filter */}
                        <div>
                            <label className="block text-[10px] sm:text-xs font-medium text-gray-400 mb-1">
                                Filter by Joined Date
                            </label>
                            <select
                                value={joinedDateFilter}
                                onChange={(e) => setJoinedDateFilter(e.target.value)}
                                className="w-full text-[10px] sm:text-xs px-3 py-2 mb-2 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="All">All</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
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
                                    placeholder="Search users..."
                                    className={`w-full px-[10px] py-[9px] text-xs bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600 
                                        transition-full duration-500 ease${searchOpen ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'
                                        }`}
                                />
                            )}
                        </div>

                        {/* Add User Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm rounded">
                            <FiPlus />
                            Add User
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto bg-neutral-900 rounded-lg shadow">
                    <table className="w-full text-[10px] sm:text-sm text-left text-white">
                        <thead className="text-[10px] sm:text-xs uppercase bg-neutral-800 text-gray-400 whitespace-nowrap">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Joined Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {paginatedUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-neutral-800/30">
                                    {/* ID */}
                                    <td className="px-4 py-3">{u.id}</td>

                                    {/* Name with Profile Picture */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3 whitespace-nowrap">
                                            <Image
                                                src={u.avatar}
                                                alt={u.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-white">{u.name}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-4 py-3 pl-6 sm:pl-4">{u.email}</td>

                                    {/* Joined Date */}
                                    <td className="px-4 py-3">{u.joinedDate}</td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${u.status === 'Active'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-red-600 text-white'
                                                }`}
                                        >
                                            {u.status}
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
                                                onClick={() => openDeleteModal(u)}
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

                    <div className="text-center w-full sm:w-auto text-xs sm:text-sm text-gray-500">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
                        {filteredUsers.length} users
                    </div>
                </div>
            </div>
            {/* Delete User Modal */}
            <DeleteUserModal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDeleteUser}
                user={selectedUser}
            />
        </main>
    )
}