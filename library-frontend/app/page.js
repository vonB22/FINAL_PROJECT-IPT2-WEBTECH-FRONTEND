// This is our landing page
'use client';

import Image from 'next/image';
import Link from "next/link";
import Navbar from '../components/Navbar/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* HOME */}
      <section id="home">
        <div
          className="h-screen w-full flex flex-col items-center justify-center px-6 py-20 mt-0 text-white text-center pt-20 bg-black/60"
          style={{
            backgroundImage: "url('/img/lib-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 leading-tight mb-4">
            Welcome to our Library
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl mb-6 mt-3 leading-relaxed">
            Our Library lets users browse, borrow, and view books easily.
            It&apos;s designed to make library access simple, fast, and well-organized.
          </p>

          <a
            href="#"
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-500 hover:to-orange-500 
            text-white font-semibold px-6 py-3 rounded-full transition duration-300 mb-8 "
          >
            Login or Register to Access
          </a>

          <div className="flex flex-col sm:flex-col gap-2 sm:gap-4 bg-black/90 rounded-sm pr-10 pl-10 pt-2 pb-2 font-Semibold">
            <Link href="/admin" className="underline hover:text-yellow-500">Admin Panel Test ➤</Link>
            <Link href="/library" className="underline hover:text-yellow-500">Library for Users Test ➤</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="min-h-screen w-full bg-gray-900 py-16 px-4 md:px-8 lg:px-16 text-white" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 pt-20">About Our Library System</h2>
            <p className="text-gray-300 mb-6">
              Our Library Management System is designed to make managing books, users, and borrowing activities more efficient and intuitive. Whether you&apos;re an admin or a library user, our system delivers a smooth and smart experience.
            </p>
            <p className="text-gray-400">
              With automated workflows, real-time inventory tracking, and an easy-to-navigate dashboard, we&apos;re transforming how libraries operate in the digital age.
            </p>
          </div>
          <div className="flex justify-center">
            <Image src="/img/about.jpg" alt="Library system preview" width={1200} height={80} className="w-full max-w-md pt-20" />
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section
        id="services"
        className="relative bg-cover bg-center bg-no-repeat text-white py-24 px-6"
        style={{
          backgroundImage: "url('/img/group.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-45"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-gray-200 mb-12 max-w-2xl mx-auto">
            Discover what our library system offers to simplify borrowing, tracking, and managing books efficiently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Book Borrowing</h3>
              <p className="text-gray-300 text-sm">Borrow books seamlessly with our smart borrowing system.</p>
            </div>

            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Online Catalog</h3>
              <p className="text-gray-300 text-sm">Browse our digital catalog from any device, anytime.</p>
            </div>

            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Admin Tools</h3>
              <p className="text-gray-300 text-sm">Manage users, books, and activity from an intuitive dashboard.</p>
            </div>
          </div>
        </div>
      </section >

      {/* GROUP PROFILES */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>

          {/* Top Row - 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <Image src="/img/M.jpg" alt="Profile" width={96} height={96} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">John Reyvel Guran</h3>
              <p className="text-gray-400">Backend Developer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <Image src="/img/M.jpg" alt="Profile" width={96} height={96} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">Von Lloyd Balana</h3>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <Image src="/img/F.jpg" alt="Profile" width={96} height={96} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">Janna Garcera Estayan</h3>
              <p className="text-gray-400">Backend Developer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <Image src="/img/F.jpg" alt="Profile" width={96} height={96} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">Agatha Nicole</h3>
              <p className="text-gray-400">Backend Developer</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <Image src="/img/F.jpg" alt="Profile" width={96} height={96} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-semibold">Rochelle Gripal Gaton</h3>
              <p className="text-gray-400">Backend Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen w-full text-white py-16 px-4 pt-40"
        style={{
          backgroundImage: "url('/img/group.jpg')",
        }}>
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl p-10 shadow-lg">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Left Side - Contact Details */}
            <div className="md:w-1/2 space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-2xl text-yellow-400 mt-1"></i>
                <div>
                  <h3 className="text-lg font-semibold">Address</h3>
                  <p className="text-gray-300">Zone 8, Bulan, Sorsogon</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <i className="fas fa-phone-alt text-2xl text-yellow-400 mt-1"></i>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-300">+123 456 7890</p>
                  <p className="text-gray-300">+123 456 7890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <i className="fas fa-envelope text-2xl text-yellow-400 mt-1"></i>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-300">G3LMS01@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
              <p className="text-gray-300 mb-6">If you have any questions or need help, reach out to us!</p>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <textarea
                    rows="5"
                    placeholder="Type your message here..."
                    className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-full transition duration-300"
                  >
                    Send Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 - Library Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Library Info</h4>
            <ul className="space-y-2">
              <li><a href="#footer" className="hover:text-yellow-400 transition">About the Library</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Opening Hours</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Contact Us</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Library Staff</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Location & Directions</a></li>
            </ul>
          </div>

          {/* Column 2 - User Services */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">User Services</h4>
            <ul className="space-y-2">
              <li><a href="#footer" className="hover:text-yellow-400 transition">Search Catalog</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Borrow & Return</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Reserve Book</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Digital Library</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">My Account</a></li>
            </ul>
          </div>

          {/* Column 3 - Policies */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><a href="#footer" className="hover:text-yellow-400 transition">Borrowing Rules</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Late Return Policy</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Terms of Service</a></li>
              <li><a href="#footer" className="hover:text-yellow-400 transition">Help & Support</a></li>
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
                className="w-full px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-md transition"
              >
                SUBSCRIBE
              </button>
            </form>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-yellow-400"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-yellow-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-yellow-400"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-yellow-400"><i className="fab fa-github"></i></a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
