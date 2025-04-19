'use client';

import React from 'react';

const AllUserModals = ({ isOpen, onClose, type, user }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>

                {type === 'add' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Add User</h2>
                        {/* Add form inputs here */}
                        <p className="text-gray-600 text-center">Form to add user...</p>
                    </div>
                )}

                {type === 'edit' && user && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
                        {/* Edit form inputs here with prefilled data */}
                        <p className="text-gray-600 text-center">Form to edit user...</p>
                    </div>
                )}

                {type === 'view' && user && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>

                        <div className="space-y-2">
                            <div>
                                <span className="font-semibold text-gray-700">Name: </span>
                                <span className="text-gray-900">{user.name}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Email: </span>
                                <span className="text-gray-900">{user.email}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Role: </span>
                                <span className="text-gray-900">{user.role}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Joined: </span>
                                <span className="text-gray-900">{user.joined}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Status: </span>
                                <span className={`font-bold ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {type === 'delete' && user && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete User</h2>
                        <p className="mb-6">Are you sure you want to remove <span className="font-bold">{user.name}</span>?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // handle delete action
                                    onClose();
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUserModals;