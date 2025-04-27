import React from 'react';

const DeleteUserModal = ({ isOpen, onClose, onDelete, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-[-180px]">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
                <h2 className="text-xl font-semibold mb-4 text-center text-red-600">Delete User</h2>
                <p className="mb-6 text-center">
                    Are you sure you want to remove <span className="font-bold">{user.name}</span>?
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button
                        onClick={() => {
                            onDelete(user.id);
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;