'use client';

import Image from "next/image";
import React, { useState } from "react";
import AuthModal from "../auth/AuthModal";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className="fixed top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/20 px-6 py-2 flex justify-between
      items-center left-0 w-full">
      {/* Logo */}
      <div className="logo flex items-center space-x-1 italic">
        <Image src="/img/logo.png" alt="Logo" width={48} height={44} />
        <span className="text-white text-xl font-bold">G3<span className="text-yellow-500 text-xl font-bold Logo">LMS</span></span>
      </div>

      <ul className="hidden md:flex space-x-6 text-white font-bold">
        <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
        <li><a href="#about" className="hover:text-yellow-500">About</a></li>
        <li><a href="#services" className="hover:text-yellow-500">Services</a></li>
        <li><a href="#contact" className="hover:text-yellow-500">Contact</a></li>
      </ul>

      <button
       onClick={() => setShowModal(true)}
       className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 
        rounded-full text-sm font-semibold hover:from-yellow-500 hover:to-orange-600">
        Log In
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}