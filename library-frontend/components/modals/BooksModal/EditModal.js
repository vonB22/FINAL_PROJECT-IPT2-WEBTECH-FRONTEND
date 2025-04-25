import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';

const EditModal = ({ isOpen, onClose, onSave, book }) => {
    const [title, setTitle] = useState(book?.title || '');
    const [author, setAuthor] = useState(book?.author || '');
    const [category, setCategory] = useState(book?.category || '');
    const [published, setPublished] = useState(book?.published || '');
    const [status, setStatus] = useState(book?.status || 'Available');
    const [image, setImage] = useState(book?.image || '/img/book01.jpg'); // Default image

    useEffect(() => {
        if (book) {
            setTitle(book.title || '');
            setAuthor(book.author || '');
            setCategory(book.category || '');
            setPublished(book.published || '');
            setStatus(book.status || 'Available');
            setImage(book.image || '/img/book01.jpg');
        }
    }, [book]); // Update state when `book` changes

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

    const handleSubmit = async () => {
        const updatedBook = { id: book.id, title, author, category, published, status, image };

        // Placeholder for backend API call
        try {
            const response = await fetch('/api/books/' + book.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            onSave(updatedBook); // Update the book in the parent component
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md lg:max-w-2xl text-black">
                <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                onError={(e) => (e.target.src = '/img/default-book.jpg')}
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
                                <option value="Available">Available</option>
                                <option value="Issued">Issued</option>
                                <option value="Reserved">Reserved</option>
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
                            <img src={image} alt="Book" className="mt-2 h-24 w-16 object-cover rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;