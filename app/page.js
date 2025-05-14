'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from "next/link";
import { loginUser, registerUser } from '@/api-handler/auth';
import { useRouter } from 'next/navigation'; // Import Next.js router

const DigitalLibraryLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    try {
      setLoading(true); // Start loading
      setError(''); // Clear previous errors

      // Perform login
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token); // Store the token

      console.log('User:', data.user);

      // Redirect to dashboard after successful login
      router.push('/dashboard'); // Redirect to your desired page (e.g., dashboard)

    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setError('Invalid credentials or server error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRegister = async () => {
    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem('auth_token', data.token);
      console.log('Registered:', data.user);
      // redirect or close modal here
    } catch (error) {
      console.error('Register failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col bg-gray-50 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/img/bgbook.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Header */}
      <nav
        className="flex items-center justify-end p-2 gap-6 shadow-md bg-neutral-900/60 backdrop-blur-lg">
        <Link href="/book-website" className="underline text-[11px] text-white sm:text-sm hover:text-yellow-500 whitespace-nowrap">Website Test ➤</Link>
        <Link href="/dashboard" className="underline text-[11px] text-white sm:text-sm hover:text-yellow-500 whitespace-nowrap">Dashboard Test ➤</Link>
        <button onClick={() => { setMode('login'); setIsOpen(true); }}
          className="text-xs sm:text-sm px-4 py-2 sm:px-4 sm:py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-full transition duration-300">
          Login
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 min-h-[calc(100vh-80px)]">
        {/* <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src="/img/owl-logo-light.png"
          alt="Logo"
          className="h-[60px] md:h-24 mb-4"
        /> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/img/owl-logo-light.png"
            alt="Logo"
            width={90}
            height={90}
            className="mb-4 w-[70px] h-[65px] sm:w-[90px] sm:h-[85px]"
            priority
          />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 drop-shadow-md"
        >
          Welcome to Digital Library
        </motion.h1>
        <p className="mt-4 text-lg sm:text-xl text-neutral-200 max-w-xl">
          Explore, borrow, and manage your favorite books online all in one place
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMode('login');
            setIsOpen(true);
          }}
          className="mt-8 px-6 sm:px-8 py-3 sm:py-3.5 bg-yellow-500 hover:bg-yellow-600 text-white/90 font-medium text-base sm:text-lg rounded-lg transition duration-300 transform hover:scale-105"
        >
          Login to continue
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-neutral-950 text-center text-[10px] sm:text-sm text-neutral-300 py-1 border-t border-white/20">
        &copy; {new Date().getFullYear()} Digital Library. All rights reserved. Version 2.0
      </footer>

      {/* LOGIN/SIGNUP Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg max-w-sm lg:max-w-4xl w-full mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div className="flex overflow-hidden">
              <div
                className="hidden lg:block lg:w-1/2 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                }}
              ></div>

              <div className="w-full p-8 lg:w-1/2">
                <h2 className="text-xl font-semibold text-gray-700 text-center flex flex-col items-center">
                  <Image src="/img/owl-logo.png" alt="Logo" width={45} height={40} className="h-10 mb-2" />
                </h2>
                <p className="text-xl text-gray-600 text-center">
                  {mode === 'login' ? 'Welcome back!' : 'Create your account'}
                </p>

                <a
                  href="#"
                  className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md bg-white hover:bg-gray-100"
                >
                  <div className="px-2 py-1 sm:px-5 sm:py-4">
                    <svg className="h-5 w-5 sm:h-7 sm:w-7" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </div>

                  <h1 className="px-4 py-3 w-5/6 text-[13px] sm:text-[15px] text-center text-gray-600 font-bold">
                    Sign {mode === 'login' ? 'in' : 'up'} with Google
                  </h1>
                </a>

                <div className="mt-6 flex items-center justify-between">
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                  <span className="text-[11px] sm:text-xs text-center text-gray-500 uppercase">
                    or {mode} with email
                  </span>
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>

                {mode === 'signup' && (
                  <div className="mt-3 sm:mt-4">
                    <label className="block text-gray-700 text-[13px] sm:text-[15px] font-bold mb-2">User Name</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      className="bg-gray-200 text-sm sm:text-base text-gray-700 h-9 sm:h-10 border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                  </div>
                )}

                <div className="mt-3 sm:mt-4">
                  <label className="block text-gray-700 text-[13px] sm:text-[15px] font-bold mb-2">Email Address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="bg-gray-200 text-sm sm:text-base text-gray-700 h-9 sm:h-10 border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                </div>

                <div className="mt-3 sm:mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-[14px] sm:text-[15px] font-bold mb-2">Password</label>
                    {mode === 'login' && <a href="#" className="text-xs text-gray-500">Forget Password?</a>}
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="bg-gray-200 text-sm sm:text-base text-gray-700 h-9 sm:h-10 border border-gray-300 rounded py-2 px-4 block w-full appearance-none" />
                </div>

                <div className="mt-6 sm:mt-8">
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        setError('');
                        if (mode === 'login') {
                          const data = await loginUser(email, password);
                          localStorage.setItem('token', data.token); // store token if needed
                          setIsOpen(false);
                        } else {
                          const data = await registerUser(username, email, password);
                          localStorage.setItem('token', data.token);
                          setIsOpen(false);
                        }
                      } catch (err) {
                        setError(err.response?.data?.message || 'An error occurred');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="bg-gray-700 text-[13px] sm:text-[15px] text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
                  </button>
                  {/* Display error message if any */}
                  {error && (
                    <div className="text-red-500 mt-2 text-sm">
                      {error}
                    </div>
                  )}

                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <button
                    className="text-[11px] md:text-xs text-gray-500 uppercase"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  >
                    {mode === 'login' ? 'or sign up' : 'or log in'}
                  </button>
                  <span className="border-b w-1/5 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalLibraryLanding;