'use client';
import { useState } from "react";
import { FiInbox, FiSend, FiTrash, FiMail, FiMenu, FiEdit, FiArrowLeft } from "react-icons/fi";

export default function Page() {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [composeModalOpen, setComposeModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [replyText, setReplyText] = useState("");

    const messages = [
        { id: 1, sender: "car.doe@example.com", subject: "Book Request - 'The Pain Of Onkai'", content: "Hello, I would like to request the book 'The Pain Of Onkai' if it's available. Could you please let me know the status?" },
        { id: 2, sender: "jane.smith@example.com", subject: "Overdue Return", content: "Hi, I received a notification about an overdue Return, but I returned the book last week. Can you please check and confirm?" },
        { id: 3, sender: "emily.jones@example.com", subject: "Account Issue", content: "I'm having trouble logging into my account. Can you help me reset my password?" },
    ];

    const handleReply = () => {
        alert(`Reply sent: ${replyText}`);
        setReplyText("");
    };

    const handleDelete = () => {
        alert(`Message deleted: ${selectedMessage?.subject}`);
        setSelectedMessage(null);
        setDeleteModalOpen(false);
    };

    const handleCompose = () => {
        setComposeModalOpen(true);
    };

    return (
        <div className="flex h-screen bg-neutral-950 text-white">
            {/* Sidebar */}
            <div
                className={`fixed z-20 inset-y-0 left-0 w-64 bg-neutral-900 border-r border-neutral-800 p-4 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } md:relative md:translate-x-0`}
            >
                <button
                    className="md:hidden text-gray-400 hover:text-white mb-4"
                    onClick={() => setSidebarOpen(false)}
                >
                    Close
                </button>
                <h2 className="text-xl font-semibold mb-6">Messages</h2>
                <ul className="space-y-4">
                    <li className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <FiInbox />
                        <span>Inbox</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <FiSend />
                        <span>Sent</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer">
                        <FiTrash />
                        <span>Trash</span>
                    </li>
                </ul>
                <button
                    onClick={handleCompose}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                >
                    <FiEdit />
                    Compose
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="flex items-center justify-between bg-neutral-900 border-b border-neutral-800 p-4">
                    {selectedMessage ? (
                        <button
                            className="text-gray-400 hover:text-white"
                            onClick={() => setSelectedMessage(null)}
                        >
                            <FiArrowLeft />
                        </button>
                    ) : (
                        <button
                            className="md:hidden text-gray-400 hover:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu />
                        </button>
                    )}
                    <h2 className="text-lg font-semibold">{selectedMessage ? "Message" : "Inbox"}</h2>
                </div>

                {/* Content */}
                <div className="flex flex-1 overflow-hidden">
                    {!selectedMessage ? (
                        // Message List
                        <div className="w-full md:w-4/3 bg-neutral-900 border-r border-zinc-800 overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-4 border-b border-neutral-800 cursor-pointer ${selectedMessage?.id === message.id ? "bg-zinc-800" : "hover:bg-zinc-800"
                                        }`}
                                    onClick={() => setSelectedMessage(message)}
                                >
                                    <h3 className="font-semibold">{message.sender}</h3>
                                    <p className="text-sm text-gray-400 truncate">{message.subject}</p>
                                    <span className="text-xs text-gray-500">{message.time}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Message Content
                        <div className="flex-1 p-4 overflow-y-auto">
                            <h3 className="text-2xl font-semibold mb-2">{selectedMessage.subject}</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                <span className="font-medium text-white">From:</span> {selectedMessage.sender}
                            </p>
                            <p className="mb-6 text-gray-300">{selectedMessage.content}</p>

                            {/* Reply Section */}
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full p-2 mb-4 bg-neutral-900 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            ></textarea>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleReply}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                                >
                                    Send Reply
                                </button>
                                <button
                                    onClick={() => setDeleteModalOpen(true)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {composeModalOpen && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
                    <div className="bg-neutral-900 p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Compose Message</h3>
                        <input
                            type="text"
                            placeholder="Recipient"
                            className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <textarea
                            placeholder="Write your message..."
                            className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        ></textarea>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setComposeModalOpen(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setComposeModalOpen(false)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
                    <div className="bg-neutral-900 p-6 rounded-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-gray-400 mb-6">Are you sure you want to delete this message?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}