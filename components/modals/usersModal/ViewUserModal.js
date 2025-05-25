import React from 'react';
import Image from 'next/image';

const ViewUserModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-950 rounded-lg p-6 w-full max-w-md text-zinc-300 mx-4 sm:mx-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">User Details</h2>
                <div className="flex flex-col items-center mb-4">
                    {user.avatar && (
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover mb-2"
                        />
                    )}
                    <span className="font-bold text-lg text-zinc-100">{user.name}</span>
                </div>
                <div className="space-y-2">
                    <div>
                        <span className="font-semibold text-zinc-400">Email: </span>
                        <span className="text-zinc-100">{user.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-zinc-400">Joined: </span>
                        <span className="text-zinc-100">{user.joinedDate}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-zinc-400">Status: </span>
                        <span className={`font-bold ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                            {user.status}
                        </span>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-zinc-400 text-black rounded hover:bg-zinc-500 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUserModal;