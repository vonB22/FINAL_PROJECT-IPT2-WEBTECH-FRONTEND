import React from 'react';
import './globals.css';
import Script from 'next/script';
import { Suspense } from 'react';
import Head from 'next/head';
// import Navbar from '../components/Navbar/Navbar';
// import Sidebar from '../components/Sidebar/Sidebar';
// import Dashboard from '../components/Dashboard/Dashboard';

export default function RootLayout({ children, }) {
  return (
    <html lang="en">
      {/* <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,700&display=swap" rel="stylesheet" />
      </Head> */}

      <Suspense fallback={null}>
        {/* If tailwindcss don't work locally */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </Suspense>

      <body className="antialiased w-full">
        {/* <Sidebar />
          <Dashboard /> */}
        {children}
      </body>
    </html>
  );
}
