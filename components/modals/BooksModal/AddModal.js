import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import Image from 'next/image';

const AddModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [published, setPublished] = useState('');
    const [status, setStatus] = useState('Available');
    const [image, setImage] = useState('/img/default-book.png'); // Default image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const newBook = { title, author, category, published, status, image };
        onSave(newBook);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-md lg:max-w-2xl text-neutral-300">
                <h2 className="text-xl font-semibold mb-4">Add Book</h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Published Year</label>
                            <input
                                type="text"
                                value={published}
                                onChange={(e) => setPublished(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option className='text-neutral-900 text-sm' value="Available">Available</option>
                                <option className='text-neutral-900 text-sm' value="Issued">Issued</option>
                                <option className='text-neutral-900 text-sm' value="Reserved">Reserved</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Book Image</label>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="file-upload"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500"
                                >
                                    <FaUpload /> Upload Image
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <Image src={image} height={96} width={64} alt="Book" className="mt-2 h-24 w-16 object-cover rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-neutral-800 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;