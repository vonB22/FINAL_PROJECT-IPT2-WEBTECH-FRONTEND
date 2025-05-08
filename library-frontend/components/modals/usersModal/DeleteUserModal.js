import React from 'react';

const DeleteUserModal = ({ isOpen, onClose, onDelete, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-xs sm:max-w-sm text-gray-200 mx-4">
                <h2 className="text-xl font-semibold mb-4 text-center text-red-500">Delete User</h2>
                <p className="mb-6 text-center text-gray-400">
                    Are you sure you want to remove <span className="font-bold text-gray-200">{user.name}</span>?
                </p>
                <div className="flex flex-row sm:flex-row justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-gray-200 rounded w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onDelete(user.id);
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded w-full sm:w-auto"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;