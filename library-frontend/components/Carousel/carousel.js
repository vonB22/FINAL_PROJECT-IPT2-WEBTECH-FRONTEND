'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function Carousel({ title, books }) {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <section className="max-w-8xl px-0 bg-gray-300 mb-6 mx-2">
            <h2 className="Title text-2xl font-bold mb-2 ml-9 pt-4 text-left text-black">{title}</h2>

            <div className="relative ml-[-15px] mr-[-10px]">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-600 text-4xl ml-[-45px] rounded-full"
                >
                    <FaArrowAltCircleLeft />
                </button>

                <div
                    ref={carouselRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-7 mx-5"
                >
                    {books.map((book, index) => (
                        <div key={index} className="flex-shrink-0 w-40 bg-gray-900 rounded-lg p-2 text-center overflow-hidden">
                            <Link href={`/library/${book.id}`}>
                                <Image
                                    src={book.cover}
                                    alt={book.title}
                                    height={175}
                                    width={145}
                                    style={{height: '175px'}}
                                    className="object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                />
                            </Link>
                            <p className="mt-2 text-sm font-medium">{book.title}</p>
                            <span
                                className={`mt-2 text-xs text-white px-3 py-1 rounded inline-block transition cursor-default
                                ${book.status === 'Available' ? 'bg-green-600 hover:bg-green-700' : ''}
                                ${book.status === 'Checked Out' ? 'bg-red-600 hover:bg-red-700' : ''}
                                ${book.status === 'Preview Only' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                                ${book.status === 'Not in Library' ? 'bg-gray-600 hover:bg-gray-700' : ''}
                                ${book.status === 'Coming Soon' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                                `} >

                                {book.status}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-600 text-4xl mr-[-45px] rounded-full"
                >
                    <FaArrowAltCircleRight />
                </button>
            </div>
        </section>
    );
}