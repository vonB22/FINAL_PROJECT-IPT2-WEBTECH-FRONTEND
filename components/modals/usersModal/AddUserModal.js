import React, { useState } from 'react';

const AddUserModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Active');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = () => {
        const newUser = { name, email, status, avatar };
        onSave(newUser);
        setName('');
        setEmail('');
        setStatus('Active');
        setAvatar('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-950 rounded-lg p-6 w-full max-w-md text-zinc-300 mx-4 sm:mx-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">Add User</h2>
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm bg-zinc-900 text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm bg-zinc-900 text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm bg-zinc-900 text-zinc-100"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1">Avatar URL</label>
                        <input
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded text-xs sm:text-sm bg-zinc-900 text-zinc-100"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-3 sm:mt-4">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-zinc-400 text-black rounded text-xs sm:text-sm hover:bg-zinc-500 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-500 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;