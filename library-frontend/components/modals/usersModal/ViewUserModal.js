import React from 'react';

const ViewUserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
                <h2 className="text-xl font-semibold mb-4 text-center">User Details</h2>
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
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewUserModal;