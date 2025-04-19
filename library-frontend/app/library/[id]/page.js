'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function BookDetailsPage() {
    const { id } = useParams();

    const Trending = [
        { id: 1, title: 'The Pain of Onkai', cover: '/img/book01.jpg', status: 'Available', description: 'A deep journey into the melodies of the soul.' },
        { id: 2, title: 'Title', cover: '/img/book02.jpg', status: 'status', description: 'short description' },
        { id: 3, title: 'Title', cover: '/img/book03.jpg', status: 'status', description: 'short description' },
        { id: 4, title: 'Title', cover: '/img/book04.jpg', status: 'status', description: 'short description' },
        { id: 5, title: 'Title', cover: '/img/book05.jpg', status: 'status', description: 'short description' },
        { id: 6, title: 'Title', cover: '/img/book06.jpg', status: 'status', description: 'short description' },
        { id: 7, title: 'Title', cover: '/img/book07.jpg', status: 'status', description: 'short description' },
        { id: 8, title: 'Title', cover: '/img/book08.jpg', status: 'status', description: 'short description' },
        { id: 9, title: 'Title', cover: '/img/book09.jpg', status: 'status', description: 'short description' },
    ];

    const book = Trending.find((b) => b.id.toString() === id);

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center w-full px-2 pr-20 bg-gray-200 text-white overflow-hidden">
                <p className="text-2xl text-gray-400 mb-6">Book Not Found</p>
                <p className="text-gray-500">Looks like the book is missing</p>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto py-3.5 flex flex-col md:flex-row gap-8 items-center mt-0 bg-gray-900/100">
            {/* Book Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <Image
                    src={book.cover}
                    alt={book.title}
                    width={320} height={420}
                    className="rounded-lg shadow-lg object-cover hover:scale-105 transition duration-300"
                />
            </div>

            {/* Book Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 px-8 py-8">
                <h1 className="text-4xl font-bold">{book.title}</h1>

                <span className={`text-sm font-semibold px-3 py-1 rounded w-max ${book.status === 'Available' ? 'bg-green-600' :
                    book.status === 'Preview Only' ? 'bg-yellow-600' :
                        book.status === 'Checked Out' ? 'bg-red-600' :
                            'bg-gray-600'
                    }`}>
                    {book.status}
                </span>

                <p className="text-gray-300 text-lg leading-relaxed">
                    {book.description}
                </p>

                <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-semibold w-max">
                    Borrow This Book
                </button>
            </div>
        </section>
    );
}