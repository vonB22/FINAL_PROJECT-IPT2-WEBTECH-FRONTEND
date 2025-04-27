'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

export default function Carousel({ title, books }) {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-6 bg-gray-200/60 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>

            <div className="relative">
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-md"
                >
                    <FaArrowAltCircleLeft size={28} />
                </button>

                {/* Carousel Items */}
                <div
                    ref={carouselRef}
                    className="grid grid-cols-2 md:flex gap-4 overflow-x-auto scroll-smooth pb-4 px-4"
                >
                    {books.map((book, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full md:w-[180px] bg-white rounded-lg shadow-lg p-2 text-center overflow-hidden"
                        >
                            <Link href={`/library/${book.id}`}>
                                <Image
                                    src={book.cover}
                                    alt={book.title}
                                    height={180}
                                    width={160}
                                    className="object-cover h-[200px] md:h-[230px] px-[10px] py-[10px] rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                />
                            </Link>
                            <p className="mt-2 text-xs md:text-sm font-medium text-gray-800">{book.title}</p>
                            <span
                                className={`mt-2 text-xs md:text-sm font-semibold text-white px-2 md:px-3 py-1 rounded inline-block transition
                                    ${book.status === 'Available' ? 'bg-green-500 hover:bg-green-600' : ''}
                                    ${book.status === 'Checked Out' ? 'bg-red-500 hover:bg-red-600' : ''}
                                    ${book.status === 'Preview Only' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                                    ${book.status === 'Not in Library' ? 'bg-gray-500 hover:bg-gray-600' : ''}
                                    ${book.status === 'Coming Soon' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                                    `}
                            >
                                {book.status}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-md"
                >
                    <FaArrowAltCircleRight size={28} />
                </button>
            </div>
        </section>
    );
}