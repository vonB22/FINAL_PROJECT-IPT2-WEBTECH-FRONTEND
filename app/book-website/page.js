'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX, FiBook, FiHome, FiInfo, FiPhone, FiLogOut, FiSearch, FiMapPin, FiMail } from 'react-icons/fi';

export default function BookWebsite() {

    // Temporary book data
    const books = useMemo(() => [
        { id: 1, title: "The Pain of Onkai", author: "N.K. Edo", image: "/img/book01.png", status: "Issued" },
        { id: 2, title: "Lost Decades", author: "Menzie Chinn", image: "/img/book02.png", status: "Available" },
        { id: 3, title: "Eloquent JavaScript", author: "Marijn Haverbeke", image: "/img/book03.png", status: "Available" },
        { id: 4, title: "Book Four", author: "Author Four", image: "/img/book04.png", status: "Available" },
        { id: 5, title: "Book Four", author: "Author Five", image: "/img/book05.png", status: "Available" },
        { id: 6, title: "Read people like a book", author: "Author 6", image: "/img/book06.png", status: "Issued" },
        { id: 7, title: "Book Four", author: "Author_7", image: "/img/book01.png", status: "Available" },
        { id: 8, title: "Book Four", author: "Author_8", image: "/img/book03.png", status: "Issued" },
        { id: 9, title: "Book Four", author: "Author_9", image: "/img/book02.png", status: "Issued" },
        { id: 10, title: "Book Four", author: "Author_10", image: "/img/book04.png", status: "Issued" },
    ], []);

    const newArrivalsData = [
        { id: 1, title: "The Pain of Onkai", author: "N.K. Edo", image: "/img/book01.png", status: "Issued" },
        { id: 2, title: "Lost Decades", author: "Menzie Chinn", image: "/img/book02.png", status: "Available" },
        { id: 3, title: "Eloquent JavaScript", author: "Marijn Haverbeke", image: "/img/book03.png", status: "Available" },
        { id: 4, title: "Book Four", author: "Author Four", image: "/img/book04.png", status: "Available" },
        { id: 5, title: "Book Four", author: "Author Five", image: "/img/book05.png", status: "Available" },
        { id: 6, title: "Read people like a book", author: "Author 6", image: "/img/book06.png", status: "Issued" },
        { id: 7, title: "Book Four", author: "Author_7", image: "/img/book01.png", status: "Available" },
        { id: 8, title: "Book Four", author: "Author_8", image: "/img/book03.png", status: "Issued" },
        { id: 9, title: "Book Four", author: "Author_9", image: "/img/book02.png", status: "Issued" },
        { id: 10, title: "Book Four", author: "Author_10", image: "/img/book04.png", status: "Issued" },
    ];

    const [carouselBgColor, setCarouselBgColor] = useState("#1c2833"); // Default background color
    const [currentSlide, setCurrentSlide] = useState(0);

    const colors = useMemo(() => [
        "#1c2833",
        "#5d6d7e",
        "#F59E0B",
        "#922b21",
        "#1b2631",
        "#f39c12",
        "#1b2631",
    ], []);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState("home"); // Track the active section
    const sidebarRef = useRef(null);

    const [detailModalOpen, setDetailModalOpen] = useState(false);//for view all details
    const [detailedBook, setDetailedBook] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationBook, setConfirmationBook] = useState(null); // To store the selected book for confirmation

    const [showAllBooks, setShowAllBooks] = useState(false);
    const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
    const newArrivals = newArrivalsData;

    const openBookModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(searchQuery.trim() === '' ? [] : filtered);
        setIsModalOpen(searchQuery.trim() !== '');
    }, [searchQuery, books]);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = (prev + 1) % books.length; // Calculate the next slide index
                setCarouselBgColor(colors[nextSlide % colors.length]); // Update background color based on the next slide
                return nextSlide; // Update the current slide
            });
        }, 3000); // Change slide and background color every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [books.length, colors]);
    
    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "books", "about", "contact"];
            const scrollPosition = window.scrollY + 100; // Add offset for better accuracy

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section); // Update the active section
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    }, []);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => {
            const nextSlide = (prev - 1 + books.length) % books.length; // Calculate the previous slide index
            setCarouselBgColor(colors[nextSlide % colors.length]); // Update background color based on the previous slide
            return nextSlide; // Update the current slide
        });
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => {
            const nextSlide = (prev + 1) % books.length; // Calculate the next slide index
            setCarouselBgColor(colors[nextSlide % colors.length]); // Update background color based on the next slide
            return nextSlide; // Update the current slide
        });
    };

    // Filtered books based on search query
    // const filteredBooks = books.filter((book) =>
    //     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     book.author.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    return (
        <div className="min-h-screen flex flex-col bg-[#FAF3E0] text-neutral-800" id="home">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-neutral-100 shadow-md">
                {/* Logo */}
                <Link href="#" className="flex items-center gap-2 text-2xl font-bold text-neutral-600">
                    <Image
                        src="/img/owl-logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="w-11 h-10"
                        aria-hidden="true"
                    />
                    <span></span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center pl-[300px] gap-8 text-sm font-medium flex-1">
                    <a href="#home" className={`hover:text-neutral-600 ${activeSection === "home" ? "border-b-2 border-blue-500" : ""}`}>Home</a>
                    <a href="#books" className={`hover:text-neutral-600 ${activeSection === "books" ? "border-b-2 border-blue-500" : ""}`}>Books</a>
                    <a href="#about" className={`hover:text-neutral-600 ${activeSection === "about" ? "border-b-2 border-blue-500" : ""}`}>About</a>
                    <a href="#contact" className={`hover:text-neutral-600 ${activeSection === "contact" ? "border-b-2 border-blue-500" : ""}`}>Contact</a>
                </div>

                {/* Search Bar */}
                <div className="relative flex items-center max-w-[250px] sm:max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 text-xl text-neutral-600" />

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-white z-50 overflow-y-auto mt-[70px] p-6">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSearchQuery('');
                                }}
                                className="absolute top-4 right-4 text-3xl text-neutral-600 hover:text-black"
                            >
                                &times;
                            </button>

                            <h2 className="text-xl font-bold mb-4">
                                Search results for: “{searchQuery}”
                            </h2>

                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    {searchResults.map((book, index) => (
                                        <div key={index} className="bg-white p-2 px-2 border rounded shadow">
                                            <Image
                                                src={book.image}
                                                alt={book.title}
                                                width={100}
                                                height={140}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDetailedBook(book);
                                                    setDetailModalOpen(true);
                                                }}
                                                className="w-30 h-38 object-cover rounded mb-2 hover:scale-105"
                                            />
                                            <button
                                                onClick={() => {
                                                    setConfirmationBook(book);
                                                    setShowConfirmModal(true);
                                                }}
                                                disabled={book.status === "Issued"}
                                                className={`mt-2 px-3 py-1 text-xs font-medium rounded transition ${book.status === "Issued"
                                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                                    } ${showAllNewArrivals ? "text-sm px-4 py-2" : "text-xs px-3 py-1"}`}
                                            >
                                                Borrow
                                            </button>
                                            <h3 className="text-lg font-semibold">{book.title}</h3>
                                            <p className="text-sm text-gray-600">Author: {book.author}</p>
                                        </div>

                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 mt-4">No books found.</p>
                            )}
                        </div>
                    )}


                </div>

                {/* Profile Dropdown */}
                <div className="hidden md:flex shadow-sm rounded-full">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-neutral-700 hover:bg-gray-500/10 p-2 rounded-full focus:outline-none"
                        onClick={() => setUserDropdownIsOpen(!userDropdownIsOpen)}
                    >
                        <Image
                            src="/img/M.jpg"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full border-2 border-neutral-300"
                            aria-hidden="true"
                        />
                        <span className="hidden md:block text-neutral-700 font-semibold text-sm">Car Doe</span>
                    </button>

                    {userDropdownIsOpen && (
                        <div className="absolute right-0 mt-12 w-48 bg-white border border-neutral-300 rounded-md shadow-lg">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-900 underline-offset-2 hover:bg-black/5 hover:text-neutral-900 focus-visible:underline focus:outline-hidden dark:text-neutral-900 dark:hover:bg-white/5 dark:hover:text-blue-500"
                                role="menuitem"
                            >
                                <Image
                                    src="/img/M.jpg"
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full"
                                    aria-hidden="true"
                                />
                                <span>Profile</span>
                            </Link>
                            <button
                                onClick={async () => {
                                    setLoading(true);
                                    await new Promise((resolve) => setTimeout(resolve, 2000));
                                    setLoading(false);
                                    window.location.href = "/";
                                }}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-950 underline-offset-2 hover:bg-black/5 hover:text-neutral-900 focus-visible:underline focus:outline-hidden dark:text-neutral-900 dark:hover:bg-white/5 dark:hover:text-red-500"
                                role="menuitem"
                            >
                                <FiLogOut />
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-neutral-600"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                </button>

                {/* Sidebar */}
                <div
                    ref={sidebarRef}
                    className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        } md:hidden`}
                >

                    {/* Close Button */}
                    <button
                        className="self-end p-4 text-neutral-800 hover:text-neutral-600"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FiX className="text-2xl" />
                    </button>

                    {/* Profile and Logout Section */}
                    <div className="flex flex-col items-center gap-4 p-4 border-b border-neutral-300">
                        <Image
                            src="/img/M.jpg"
                            alt="Profile"
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-full border-2 border-neutral-300"
                            aria-hidden="true"
                        />
                        <span className="text-lg font-semibold text-neutral-800">Car Doe</span>
                        <button
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    setLoading(false);
                                    window.location.href = "/";
                                }, 2000);
                            }}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4 p-4 text-sm font-medium">
                        <Link
                            href="#home"
                            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FiHome className="text-lg" /> Home
                        </Link>
                        <Link
                            href="#books"
                            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FiBook className="text-lg" /> Books
                        </Link>
                        <Link
                            href="#about"
                            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FiInfo className="text-lg" /> About
                        </Link>
                        <Link
                            href="#contact"
                            className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FiPhone className="text-lg" /> Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Carousel */}
                <div
                    className="relative w-full h-auto md:h-[350px] flex flex-col md:flex-row items-center bg-neutral-200"
                    style={{
                        backgroundColor: carouselBgColor,
                    }}
                >
                    {/* Book Image Section */}
                    <div className="flex-1 flex items-center justify-center p-4">
                        <Image
                            src={books[currentSlide]?.image}
                            alt={books[currentSlide]?.title}
                            width={180}
                            height={255}
                            className="object-contain max-w-[120px] sm:max-w-[180px] md:max-w-[250px]"
                        />
                    </div>

                    {/* Book Details Section */}
                    <div className="flex-1 p-4 md:p-6 text-neutral-100 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{books[currentSlide]?.title}</h2>
                        <p className="text-sm sm:text-lg md:text-2xl mt-2">{books[currentSlide]?.author}</p>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-neutral-300 z-30"
                    >
                        ‹
                    </button>
                    <button
                        onClick={handleNextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-neutral-300 z-30"
                    >
                        ›
                    </button>
                </div>

                {/* Featured Books Section */}
                <section className="py-8 px-4 md:px-8 bg-neutral-100" id="books">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-neutral-800">Featured Books</h2>
                        <button
                            onClick={() => setShowAllBooks((prev) => !prev)}
                            aria-label={showAllBooks ? "Back to Carousel View" : "View All Books"}
                            className="inline-flex items-center gap-1 text-blue-600 bg-white border border-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                        >
                            {showAllBooks ? (
                                <>
                                    <span className="text-lg">‹</span> Back
                                </>
                            ) : (
                                <>
                                    <span className="text-lg">›</span> See All
                                </>
                            )}
                        </button>
                    </div>

                    <div
                        className={`${showAllBooks
                            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                            : "flex overflow-x-auto space-x-4"
                            }`}
                    >
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className={`relative flex flex-col items-center pt-6 p-3 bg-white/5 border border-neutral-300 rounded-lg shadow transition-all ${showAllBooks
                                    ? ""
                                    : "min-w-[140px] max-w-[200px] sm:min-w-[200px] sm:max-w-[250px]"
                                    }`}
                            >
                                {/* Current Status */}
                                <span
                                    className={`absolute top-2 right-2 text-[9px] px-2 py-1 rounded-full ${book.status === "Issued"
                                        ? "bg-red-500 text-white"
                                        : "bg-green-500 text-white"
                                        }`}
                                >
                                    {book.status}
                                </span>

                                {/* Book Image */}
                                <div className="relative w-full flex flex-col items-center cursor-pointer group">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        width={showAllBooks ? 120 : 100}
                                        height={showAllBooks ? 180 : 140}
                                        className="mb-3 object-contain transform transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Hover Overlay: View All Details */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering other events
                                            setDetailedBook(book);
                                            setDetailModalOpen(true); // Open Full Details Modal
                                        }}
                                        className="absolute py-[70px] inset-0 flex items-center justify-center bg-black/5 text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold"
                                    >
                                        View All Details
                                    </button>
                                </div>

                                {/* Borrow Button */}
                                <button
                                onClick={() => {
                                    setConfirmationBook(book);
                                    setShowConfirmModal(true);
                                }}
                                    disabled={book.status === "Issued"}
                                    className={`mt-2 px-3 py-1 text-xs font-medium rounded transition ${book.status === "Issued"
                                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                        } ${showAllBooks ? "text-sm px-4 py-2" : "text-xs px-3 py-1"}`}
                                >
                                    Borrow
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Full Details Modal */}
                    {detailModalOpen && detailedBook && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                                <button
                                    onClick={() => setDetailModalOpen(false)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                                >
                                    &times;
                                </button>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <Image
                                        src={detailedBook.image}
                                        alt={detailedBook.title}
                                        width={150}
                                        height={220}
                                        className="object-contain mx-auto"
                                    />

                                    <div className="flex-1 space-y-2">
                                        <h2 className="text-2xl font-bold text-neutral-800">{detailedBook.title}</h2>
                                        <p className="text-sm text-neutral-600">Author: {detailedBook.author}</p>
                                        <p className="text-sm text-neutral-600">Genre: {detailedBook.genre || "N/A"}</p>
                                        <p className="text-sm text-neutral-600">Published: {detailedBook.publishedDate || "Unknown"}</p>
                                        {detailedBook.description ? (
                                            <p className="text-sm text-neutral-700 mt-2">{detailedBook.description}</p>
                                        ) : (
                                            <p className="text-sm text-neutral-400 italic mt-2">No description available.</p>
                                        )}

                                        <p className="text-sm text-neutral-600">
                                            Status:{" "}
                                            <span
                                                className={`px-2 py-1 rounded ${detailedBook.status === "Issued"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-green-500 text-white"
                                                    }`}
                                            >
                                                {detailedBook.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* New Arrivals Section */}
                <section className="py-8 px-4 md:px-8 bg-neutral-100" id="new-arrivals">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-neutral-800">New Arrivals</h2>
                        <button
                            onClick={() => setShowAllNewArrivals((prev) => !prev)}
                            aria-label={showAllNewArrivals ? "Back to Carousel View" : "View All Books"}
                            className="inline-flex items-center gap-1 text-blue-600 bg-white border border-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                        >
                            {showAllNewArrivals ? (
                                <>
                                    <span className="text-lg">‹</span> Back
                                </>
                            ) : (
                                <>
                                    <span className="text-lg">›</span> See All
                                </>
                            )}
                        </button>
                    </div>

                    <div className={`${showAllNewArrivals
                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                        : "flex overflow-x-auto space-x-4"
                        }`}
                    >

                        {newArrivals.map((book) => (
                            <div
                                key={book.id}
                                className={`relative flex flex-col items-center pt-6 p-3 bg-white/5 border border-neutral-300 rounded-lg shadow transition-all ${showAllNewArrivals
                                    ? ""
                                    : "min-w-[140px] max-w-[200px] sm:min-w-[200px] sm:max-w-[250px]"
                                    }`}
                            >
                                {/* Current Status */}
                                <span
                                    className={`absolute top-2 right-2 text-[9px] px-2 py-1 rounded-full ${book.status === "Issued"
                                        ? "bg-red-500 text-white"
                                        : "bg-green-500 text-white"
                                        }`}
                                >
                                    {book.status}
                                </span>

                                {/* Book Image */}
                                <div className="relative w-full flex flex-col items-center cursor-pointer group">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        width={showAllNewArrivals ? 120 : 100}
                                        height={showAllNewArrivals ? 180 : 140}
                                        className="mb-3 object-contain transform transition-transform duration-300 group-hover:scale-105"
                                    />

                                    {/* Hover Overlay: View All Details */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering other events
                                            setDetailedBook(book);
                                            setDetailModalOpen(true); // Open Full Details Modal
                                        }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/5 text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold"
                                    >
                                        View All Details
                                    </button>
                                </div>

                                {/* Book Title */}
                                {/* <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-800">
                                    {book.title}
                                </h3> */}

                                {/* Book Author */}
                                {/* <p className="text-xs sm:text-sm md:text-base text-neutral-600">
                                    {book.author}
                                </p> */}

                                {/* Borrow Button */}
                                <button
                                    onClick={() => {
                                        setConfirmationBook(book);
                                        setShowConfirmModal(true);
                                    }}
                                    disabled={book.status === "Issued"}
                                    className={`mt-2 px-3 py-1 text-xs font-medium rounded transition ${book.status === "Issued"
                                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                        } ${showAllNewArrivals ? "text-sm px-4 py-2" : "text-xs px-3 py-1"}`}
                                >
                                    Borrow
                                </button>

                                {/* Borrow Confirmation Modal */}
                                {showConfirmModal && confirmationBook && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-100">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-lg font-semibold mb-4">Confirm Borrow Request</h3>
                                            <p className="text-sm text-gray-700 mb-6">
                                                Are you sure you want to borrow <strong>{confirmationBook.title}</strong>?
                                            </p>
                                            <div className="flex justify-end gap-4">
                                                {/* Cancel Button */}
                                                <button
                                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                                    onClick={() => setShowConfirmModal(false)} // Close the modal
                                                >
                                                    Cancel
                                                </button>
                                                {/* Confirm Borrow Button */}
                                                <button
                                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    onClick={() => {
                                                        // Borrow logic here
                                                        setShowConfirmModal(false); // Close the modal
                                                        alert(`You have borrowed ${confirmationBook.title}`); // Show confirmation alert
                                                    }}
                                                >
                                                    Confirm Borrow
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>

                    {/* Full Details Modal */}
                    {detailModalOpen && detailedBook && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                                <button
                                    onClick={() => setDetailModalOpen(false)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                                >
                                    &times;
                                </button>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <Image
                                        src={detailedBook.image}
                                        alt={detailedBook.title}
                                        width={150}
                                        height={220}
                                        className="object-contain mx-auto"
                                    />

                                    <div className="flex-1 space-y-2">
                                        <h2 className="text-2xl font-bold text-neutral-800">{detailedBook.title}</h2>
                                        <p className="text-sm text-neutral-600">Author: {detailedBook.author}</p>
                                        <p className="text-sm text-neutral-600">Genre: {detailedBook.genre || "N/A"}</p>
                                        <p className="text-sm text-neutral-600">Published: {detailedBook.publishedDate || "Unknown"}</p>
                                        {detailedBook.description ? (
                                            <p className="text-sm text-neutral-700 mt-2">{detailedBook.description}</p>
                                        ) : (
                                            <p className="text-sm text-neutral-400 italic mt-2">No description available.</p>
                                        )}

                                        <p className="text-sm text-neutral-600">
                                            Status:{" "}
                                            <span
                                                className={`px-2 py-1 rounded ${detailedBook.status === "Issued"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-green-500 text-white"
                                                    }`}
                                            >
                                                {detailedBook.status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* ABOUT */}
                <section id="about" className="h-[40vh] sm:h-[60vh] md:h-[80vh] w-full bg-white text-neutral-800 py-5 sm:py-20 px-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        {/* Left Side - Transparent Book Image (Hidden on small screens) */}
                        <div className="hidden md:block md:w-1/2">
                            <Image
                                src="/img/about.jpg"
                                alt="Stack of Books"
                                width={500}
                                height={500}
                                className="object-contain w-full h-auto"
                            />
                        </div>

                        {/* Right Side - Text Content */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700">About Us</h2>
                            <p className="text-sm sm:text-base md-text-lg text-neutral-700">
                                Welcome to Digital Library — your cozy corner for all things literary. Whether you&#39;re a
                                passionate reader, an aspiring writer, or just curious, we&#39;re here to inspire
                                and connect book lovers from around the world.
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-neutral-600">
                                Our platform offers curated recommendations, community discussions, and exclusive
                                author insights. Join us and turn every page into a new adventure.
                            </p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm md:text-base text-white font-semibold px-4 sm:px-6  py-1 sm:py-2 rounded-full transition">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section
                    id="contact"
                    className="min-h-screen w-full text-neutral-800 py-16 px-4 pt-40"
                    style={{
                        backgroundImage: "url('/img/group.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="max-w-6xl mx-auto bg-white/90 rounded-xl p-6 sm:p-10 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
                            {/* Left Side - Contact Details */}
                            <div className="md:w-1/2 space-y-2 sm:space-y-8">
                                {/* Address */}
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <FiMapPin />
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold">Address</h3>
                                        <p className="text-xs sm:text-sm text-neutral-600">Zone 8, Bulan, Sorsogon</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <FiPhone />
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold">Phone</h3>
                                        <p className="text-xs sm:text-base text-neutral-600">+123 456 7890</p>
                                        <p className="text-xs sm:text-base text-neutral-600">+123 456 7890</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <FiMail />
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold">Email</h3>
                                        <p className="text-xs sm:text-base text-neutral-600">digital.libraryV2.0@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Line Separator (only visible on md and up) */}
                            <div className="hidden md:block w-px bg-neutral-400 mx-2"></div>

                            {/* Right Side - Contact Form */}
                            <div className="md:w-1/2">
                                <h3 className="text-lg sm:text-2xl font-bold mb-2 text-neutral-800">Send us a message</h3>
                                <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">
                                    If you have any questions or need help, reach out to us!
                                </p>

                                <form className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter your email"
                                            className="w-full bg-neutral-300 text-neutral-800 p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            rows="4"
                                            placeholder="Type your message here..."
                                            className="w-full bg-neutral-300 text-neutral-800 p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full transition duration-300"
                                        >
                                            Send Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer id="footer" className="bg-neutral-900 text-neutral-300 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                    {/* Column 1 - Library Info */}
                    <div>
                        <h4 className="text-base sm:text-xl font-semibold text-neutral-100 mb-4">Library Info</h4>
                        <ul className="space-y-0 sm:space-y-2">
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">About the Library</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Opening Hours</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Contact Us</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Library Staff</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Location & Directions</a></li>
                        </ul>
                    </div>

                    {/* Column 2 - User Services */}
                    <div>
                        <h4 className="text-base sm:text-xl font-semibold text-neutral-100 mb-4">User Services</h4>
                        <ul className="space-y-0 sm:space-y-2">
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Search Catalog</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Borrow & Return</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Reserve Book</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Digital Library</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">My Account</a></li>
                        </ul>
                    </div>

                    {/* Column 3 - Policies */}
                    <div>
                        <h4 className="text-base sm:text-xl font-semibold text-neutral-100 mb-4">Policies</h4>
                        <ul className="space-y-0 sm:space-y-2">
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Borrowing Rules</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Late Return Policy</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Terms of Service</a></li>
                            <li><a href="#footer" className="text-sm sm:text-base text-neutral-500 hover:text-white transition">Help & Support</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Newsletter</h4>
                        <p className="text-sm mb-4">
                            Subscribe to our newsletter to get the latest updates on new arrivals, library events, reading tips, and more—delivered weekly to your inbox.
                        </p>
                        <form action="#" className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Your email"
                                required
                                className="w-full px-4 py-2 rounded-md bg-neutral-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                        <div className="flex gap-4 text-xl">
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
                            <a href="#" className="hover:text-blue-400"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-1 bg-white border-t border-neutral-300 text-center text-sm text-neutral-600">
                © 2025 Digital Library. All rights reserved. Version 2.0
            </footer>
        </div>
    );
}