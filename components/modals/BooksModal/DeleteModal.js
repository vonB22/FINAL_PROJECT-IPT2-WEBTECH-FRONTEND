import React from 'react';
import Image from 'next/image';

const DeleteModal = ({ isOpen, onClose, onDelete, book }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-[-180px]">
            <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-xs sm:max-w-sm text-gray-200 mx-4">
                <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Delete Book</h2>
                <div className="flex items-center gap-4 mb-6">
                    <p className="text-center">
                        Are you sure you want to delete <span className="font-bold">{book.title}</span>?
                    </p>
                    <Image
                        src={book.image}
                        alt={book.title}
                        height={96} width={64}
                        className="h-24 w-16 object-cover rounded"
                    />
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-gray-200 rounded w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
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