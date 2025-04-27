import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, book }) => {
    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-[-180px]">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm text-black flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Delete Book</h2>
                <div className="flex items-center gap-4 mb-6">
                    <p className="text-center">
                        Are you sure you want to delete <span className="font-bold">{book.title}</span>?
                    </p>
                    <img
                        src={book.image}
                        alt={book.title}
                        className="h-24 w-16 object-cover rounded"
                    />
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onDelete(book.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;