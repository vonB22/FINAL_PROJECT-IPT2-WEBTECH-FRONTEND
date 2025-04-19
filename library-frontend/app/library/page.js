'use client';

import Carousel from '../../components/Carousel/carousel';

export default function LibraryPage() {
    const Trending = [
        {
            id: 1,
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Available',
        },
        {
            id: 2,
            title: 'Lost Decades',
            cover: '/img/book02.jpg',
            status: 'Coming Soon',
        },
        {
            id: 3,
            title: 'Eloquent Javascript Second Edition',
            cover: '/img/book03.jpg',
            status: 'Preview Only',
        },
        {
            id: 4,
            title: (<>The Philippines <br /> A Century Hence</>),
            cover: '/img/book04.jpg',
            status: 'Available',
        },
        {
            id: 5,
            title: 'Noli Me Tangere',
            cover: '/img/book05.jpg',
            status: 'Not in Library',
        },
        {
            id: 6,
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            id: 7,
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            id: 8,
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            id: 9,
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
    ];
    const Thrillers = [
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Available',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Preview Only',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Preview Only',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Not in Library',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
        {
            title: 'The Pain of Onkai',
            cover: '/img/book01.jpg',
            status: 'Checked Out',
        },
    ];
    // const Thrillers = [
    //     {
    //         title: 'Control Your Mind',
    //         cover: 'https://covers.openlibrary.org/b/id/10523353-L.jpg',
    //         status: 'Not in Library',
    //     }, 
    // ];

    return (
        <>
            <Carousel  title="Trending" books={Trending} />;
            <Carousel title="Thrillers" books={Thrillers} />;
        </>
    );
}